## TODO APP

This app consists of 4 containers

- Express REST API container (nodejs)
- NextJS container (nodejs)
- MongoDB container
- NGINX server

## Connections and networks

NextJS <-> NGINX
NGINX <-> Express
Express <-> MongoDB

## Running

Fill the environment variables with your credentials as stated in the env.example.

To run the app in a development environment run the following command:
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

To run the app in a production environment run the following command:
`docker-compose -f docker-compose.yml up -d`
