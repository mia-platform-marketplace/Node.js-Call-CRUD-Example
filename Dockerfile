FROM node:12.12.0-alpine

EXPOSE 3000
WORKDIR /usr/src/app
COPY package.json .
RUN npm install    
COPY . .

CMD [ "npm", "start" ]    
