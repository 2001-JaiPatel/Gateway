FROM node:12.22.4-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]