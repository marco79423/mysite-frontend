FROM node:16-alpine

# Environment

ENV NODE_ENV=production
WORKDIR /app

# Dependencies

COPY package.json /app/
COPY package-lock.json /app/
COPY lerna.json /app/

COPY src/apps/lab/package.json /app/src/apps/lab/
COPY src/apps/lab/package-lock.json /app/src/apps/lab/

RUN npm ci --ignore-scripts --production --no-optional
RUN npx lerna bootstrap # --hoist --ignore-scripts -- --production --no-optional

# Build

COPY src/apps/lab /app/src/apps/lab

WORKDIR /app/src/apps/lab
RUN npm run build

# Run

CMD ["npm", "run", "start"]
EXPOSE 3000
