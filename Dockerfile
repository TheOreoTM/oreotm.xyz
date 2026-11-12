# oreotm.xyz as a container, for self-hosting (Dokploy on the VPS).

# ---- build ----
FROM node:26-slim AS build
WORKDIR /app
# Node 25+ no longer ships Corepack, so install the pnpm version package.json pins.
RUN npm install -g pnpm@9.15.1
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && pnpm prune --prod

# ---- runtime ----
FROM node:26-slim
WORKDIR /app
# Behind Dokploy's proxy: take the public protocol and host from its headers.
ENV NODE_ENV=production PORT=3000 PROTOCOL_HEADER=x-forwarded-proto HOST_HEADER=x-forwarded-host
COPY --from=build --chown=node:node /app/package.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/build ./build
# The minigames page reads this file by path when the server starts.
COPY --from=build --chown=node:node /app/src/routes/minigames/data.csv ./src/routes/minigames/data.csv
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD node -e "fetch('http://localhost:'+process.env.PORT+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "build"]
