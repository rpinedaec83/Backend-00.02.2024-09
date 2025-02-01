FROM node:20-alpine    

WORKDIR /out/app

COPY package.json package.lock.json ./

RUN npm install


COPY src/ ./src/

EXPOSE 4002

CMD [ "npm", "start" ]