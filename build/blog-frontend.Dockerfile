FROM node:16-alpine

# Environment

ENV NODE_ENV=production
WORKDIR /app

# Dependencies

COPY package.json /app/
COPY package-lock.json /app/
COPY lerna.json /app/

COPY src/apps/blog-frontend/package.json /app/src/apps/blog-frontend/
COPY src/apps/blog-frontend/package-lock.json /app/src/apps/blog-frontend/

RUN npm ci --ignore-scripts --production --no-optional
RUN npx lerna bootstrap # --hoist --ignore-scripts -- --production --no-optional

# Build

COPY src/apps/blog-frontend /app/src/apps/blog-frontend

WORKDIR /app/src/apps/blog-frontend
RUN npm run build

# Run

CMD ["npm", "run", "start"]
EXPOSE 3000
