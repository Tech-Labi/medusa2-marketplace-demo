# Medusa2 Marketplace demo

This is a demo project which demoes how to create a multivendor marketplace demo using [Medusa 2.0](https://medusajs.com/)

Detailed article on Medium https://medium.com/@igorkhomenko/building-a-multivendor-marketplace-with-medusa-js-2-0-a-dev-guide-f55aec971126

![1_EMHanavMVUIrwCw4_ROoiw](https://github.com/user-attachments/assets/c2cee973-7704-4843-8da4-8c5e877cdc8e)


## How to run 

1. Run PostgreSQL Only

By default, running the following command will start only the `PostgreSQL` container:

```
docker compose up
```
This command will use your default docker-compose.yml file to start the `PostgreSQL` service, but `Medusa` will not be started automatically.

2. Run Both PostgreSQL and Medusa Together

If you want to run both PostgreSQL and Medusa in one command, use the following command that combines both the main `docker-compose.yml` file and the `docker-compose.medusa.yml` file:

```bash
docker compose -f docker-compose.yml -f docker-compose.medusa.yml up --build
```
This command will build and start both PostgreSQL and Medusa containers.

3. Alternative Manual Setup (Without Medusa Docker Compose)

```bash
cd medusa-marketplace-demo
yarn
cp .env.template .env
npx medusa db:setup --db marketplace
yarn dev
```

The Medusa dashboard should now be running on http://localhost:9000/app

## License

MIT
