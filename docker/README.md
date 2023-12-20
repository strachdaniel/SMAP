# UniEdu - Docker


## Description

This project is comprised of three microservices and a PostgreSQL database. The client is built with Next.js, and the microservices are built with Node.js and Express, using Prisma as the ORM. This document provides instructions on how to set up the project and run the backend services.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)

## Folder Structure

The UniEdu project has the following folder structure:

```
. UniEdu
├── client
├── docker
├── modul-auth
└── modul-library
```

Each folder corresponds to a microservice, and the `client` folder contains the frontend.

## Dependencies

- React
- Next.js 13
- Node.js 18
- Express
- Prisma
- Docker

## Installation

1. Clone the repositories for each microservice and the client.
2. Follow the instructions in each microservice's documentation to set up the service.
3. Install Docker or Docker Desktop.

## Usage

To run all the backend services, including the PostgreSQL database, follow these steps:

1. Navigate to the `docker` directory.
2. Run the following command to start the services:

```
docker-compose up -d
```

This will start the services in the background.

3. To shut down the services, run the following command:

```
docker-compose down
```


This will stop and remove the containers.

4. If you make changes to the services and want to propagate them to Docker, run the following command:

```
docker-compose up -d --build
```


This will rebuild the containers with the updated changes.


## URL

[http://localhost:3000](http://localhost:3000) - Client (not included in docker yet)

[http://localhost:3001](http://localhost:3001) - Auth

[http://localhost:3002](http://localhost:3002) - Library