FROM node:14-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install -g npm && npm install --production

COPY . .

RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3000
