FROM node:22-alpine

WORKDIR /application

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build 

EXPOSE 9000

CMD ["yarn", "dev"]