FROM node:22-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 9000

CMD ["yarn", "dev"]