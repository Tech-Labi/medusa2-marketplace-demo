## Running Medusa with Docker

To run Medusa in your environment using Docker, follow these steps. Note: `PostgreSQL` must already be running and accessible for Medusa to work.

1. Build the Medusa Docker Image

First, you need to build the Medusa Docker image. Use the following command to build the image from the Dockerfile:

```bash
docker build -t ${PROJECT_NAME:-marketplace}-medusa .
```

This command will build the Medusa image and tag it as `${PROJECT_NAME:-marketplace}-medusa`.

2. Run the Medusa Container

Once the image is built, you can run the Medusa container. Use the following `docker run` command to start Medusa:

```bash
docker run -d \
  --name ${PROJECT_NAME:-marketplace}-medusa \
  --network ${PROJECT_NAME:-marketplace} \
  -p 9000:9000 \
  -v ./.env.docker:/app/.env \
  ${PROJECT_NAME:-marketplace}-medusa \
  sh -c "npx medusa db:setup --db marketplace && yarn dev"
```