# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/vostavhy/nodejs2022Q2-service.git
```

## Running application locally

Install PostgreSQL: https://www.postgresql.org/download/

Create and configure DB. For instance, you can use the following data:

```
POSTGRES_USER=nest_api_user
POSTGRES_PASSWORD=nest_api_pass
POSTGRES_DB=nest_api_db
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

Installing NPM modules

```
npm install
```

Running application

```
npm start
```

## Running application in Docker container

Install Docker Engine: https://docs.docker.com/engine/install/

Running containers

```
npm run start:docker
```

Stop containers

```
npm run stop:docker
```

## Swagger

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Authorization

Bearer token is required for all operations except sign up, login, refresh

## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Scan Docker containers for vulnerabilities

app

```
npm run scan:app
```

db

```
npm run scan:db
```
