FROM node:16-alpine

WORKDIR /project

COPY package.json /project/

RUN yarn install

COPY . /project

EXPOSE 3005

CMD ["yarn", "start"]