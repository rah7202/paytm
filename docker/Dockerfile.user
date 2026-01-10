FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json ./

COPY apps ./apps
COPY packages ./packages

#Install dependencies 
RUN npm install

RUN npm run db:generate

RUN npm run build 

EXPOSE 3001

CMD ["npm", "run", "start-user-app"]