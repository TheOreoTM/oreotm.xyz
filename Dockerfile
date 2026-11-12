# oreotm.xyz as a container, for self-hosting (Dokploy on the VPS).

# ---- build ----
FROM node:26-slim AS build
WORKDIR /app
# Node 25+ no longer ships Corepack, so install the pnpm version package.json pins.
RUN npm install -g pnpm@9.15.1
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---- runtime ----
FROM node:26-slim
WORKDIR /app
# The standalone server reads PORT and HOSTNAME; 0.0.0.0 makes it reachable from Dokploy's proxy.
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NEXT_TELEMETRY_DISABLED=1
# .next/standalone holds server.js, the traced node_modules and the Markdown in content/.
COPY --from=build --chown=node:node /app/.next/standalone ./
# The standalone output leaves out static assets and public files, so add them.
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD node -e "fetch('http://localhost:'+process.env.PORT+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
