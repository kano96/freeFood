#Get node image from dockerhub
FROM node:12-alpine
WORKDIR /usr/src/app
COPY package.json* ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node" , "app.js"]