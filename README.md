# dog-breed-api

The goal of this project is to show how to run a modern KOA API server that ran against a local postgres database.

## Requirements

- Node 10+
- Docker
- yarn
- knexJS installed globally `yarn global add knex`

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

## Local Development

### Migrate & Seed Database

```zsh
$ npm run migrate && npm run seed
# or
$ yarn migrate && yarn seed
```

### Running Local

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

For just the database:
```zsh
$ docker run -d -p 5432:5432 -e POSTGRES_USER=postAdmin -e POSTGRES_PASSWORD=8P69RoDj10KJF8LS -e POSTGRES_DB=dog-breeds-api postgres:latest
```

OR

Docker container up and build latest image:
```zsh
$ docker-compose up -d --build;
```

then hit the APIs below.


Stop the container and remove it with:
```zsh
$ docker-compose down;
```

### Production

```zsh
$ docker build -t dog-breed-api:latest .
$ docker run -p 3000:3000 --init dog-breed-api:latest
```
Visit http://localhost:3000 or https://localhost:3001 if https is setup

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

## Example Breed Body

```json
{
    "name": "Doberman Pinscher",
    "nicknames": "Doberman, Dobe, Dobynm, Dobie, Dobermann",
    "description": "The Doberman Pinscher, or Dobermann, or Doberman, is a medium-large breed of domestic dog originally developed around 1890 by Karl Friedrich Louis Dobermann, a tax collector from Germany.",
    "origin": "Germany",
    "life_span": "10 - 13 years",
    "temperament": "Intelligent, Obedient, Fearless, Loyal, Alert, Energetic, Confident",
    "colors": "White, Fawn, Black, Blue, Red, Black & Rust, Red & Rust, Blue & Rust, Fawn & Rust",
    "height": {
        "male": 28,
        "female": 27
    },
    "weight": {
        "male": 100,
        "female": 90
    },
    "coat": "Short",
    "akc": "Working",
    "image": "url string"
}
```