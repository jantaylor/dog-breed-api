# dog-breed-api

The goal of this project is to show how to run a modern KOA API server that ran against a local postgres database.

## Requirements

- Node 10+
- Docker
- yarn

> `yarn` is recommended.

## Install

```zsh
$ npm i
# or
$ yarn
```

## Testing

```zsh
$ npm test
# or
$ yarn test
```

## Running Local Development

```zsh
$ npm run start:dev
# or
$ yarn start:dev
```

## Docker

### Development

```zsh
$ docker build -t dog-breed-api:dev -f Dockerfile.dev .
$ docker run \
    -p 3000:3000 \
    -p 9229:9229 \
    -v "$PWD:/usr/src/app" \
    -v "/usr/src/app/node_modules" \
    --init \
    dog-breed-api:dev
```
Go visit http://localhost:3000 or exposed PORT=ENV

OR

Docker container up and build latest image
```zsh
$ docker-compose up --build;
```

Docker container down
```zsh
$ docker-compose down;
```

### Production

```zsh
$ docker build -t dog-breed-api:latest .
$ docker run -p 3000:3000 --init dog-breed-api:latest
```
Visit http://localhost:3000 or https://localhost:3001 if https is setup

## Insomnia/Postman config


## Routes

> `GET /api/v1/breed`\
> Return all breeds

> `POST /api/v1/breed`\
>Create new breed and return it

> `GET /api/v1/breed/:id`\
>Return breed with id

> `PUT /api/v1/breed/:id`\
> Update breed with id

> `DELETE /api/v1/breed/:id`\
> Delete breed with id