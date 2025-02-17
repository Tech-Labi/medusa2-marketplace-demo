# Medusa2 Marketplace demo

This is a demo project which demoes how to create a multivendor marketplace demo using [Medusa 2.0](https://medusajs.com/)

Detailed article on Medium:
- Part 1 https://medium.com/@igorkhomenko/building-a-multivendor-marketplace-with-medusa-js-2-0-a-dev-guide-f55aec971126
- Part 2 https://medium.com/@igorkhomenko/building-a-multivendor-marketplace-with-medusa-js-2-0-super-admin-d899353b0b1e

![1_EMHanavMVUIrwCw4_ROoiw](https://github.com/user-attachments/assets/c2cee973-7704-4843-8da4-8c5e877cdc8e)


## How to run 

### Option 1: All in one

If you want to run both PostgreSQL and Medusa in one command, use the following command that combines both the main `docker-compose.yml` file and the `docker-compose.medusa.yml` file:

```bash
docker compose -f docker-compose.yml -f docker-compose.medusa.yml up --build
```
This command will build and start both PostgreSQL and Medusa containers.

**Important:** You can only run this command after `PostgreSQL` has already been started using the docker compose up command from Option 2 (below). This is because PostgreSQL creates a network that Medusa depends on to run properly.

### Option 2: run Medusa app manually

1. Run PostgreSQL

By default, running the following command will start only the `PostgreSQL` container:

```
docker compose up
```

This command will use your default docker-compose.yml file to start the `PostgreSQL` service, but `Medusa` will not be started automatically. This step is required because we create a network in `PostgreSQL`, and `Medusa` depends on it.

2. Run Medusa app manually

```bash
cd medusa-marketplace-demo
yarn
cp .env.template .env
npx medusa db:setup --db marketplace
yarn dev
```

The Medusa dashboard should now be running on http://localhost:9000/app

## Cleanup resources

If you want to remove the containers, networks, and volumes created by Docker Compose, use the following commands:

Option 1: Using the default `docker-compose.yml` (for PostgreSQL only)

```bash
docker compose down -v
```

Option 2: Using the combined `docker-compose.yml` and `docker-compose.medusa.yml`

```bash
docker compose -f docker-compose.yml -f docker-compose.medusa.yml down -v
```

## License

MIT
