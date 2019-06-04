FROM node:7.6-alpine

RUN mkdir -p /src

WORKDIR /src

COPY . /src

RUN yarn install

EXPOSE 3000

CMD [ "sh", "-c", "sleep 20 && npm run seed && npm run server-dev" ]