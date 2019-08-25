FROM node:12-alpine

WORKDIR /app
EXPOSE 3000
CMD ["npm", "run", "dev"]

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .
