# Node.js Express & PostgreSQL REST API with Prisma

This project is a REST API built with Node.js, Express, PostgreSQL, and Prisma ORM. It provides endpoints for managing data related to users, readers, books, categories, subcategories, borrows, and paired categories.

## Prerequisites

- Node.js v14.x or higher
- PostgreSQL
- Yarn or npm

## Installation

### 1. Install dependencies:

```bash
yarn install
```

### 2. Set up environment variables:

Create a .env file in the root directory of the project
Add the following variables:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/my_database?schema=public"
```

### 3. Database Setup

Create a new PostgreSQL database.

If not changing schema.prisma run

```bash
yarn prisma migrate deploy
```

### 4. Running the Application

Start the development server:

```bash
nodemon ./src/server.ts
or
npm run dev
```

The API will be available at http://localhost:3000.

### 5. Prisma Commands

Generate Prisma Client: If you make changes to the schema.prisma file, you need to run the following command to update the Prisma Client:

```bash
yarn prisma generate
```

Migrate database schema: If you make changes to the schema.prisma file, run the following command to create a new migration and apply it to the database:

```bash
yarn prisma migrate dev --name your_migration_name
```

Download JSON and import it into INSOMNIA app to see API docs - [Insomnia JSON](https://drive.google.com/file/d/1ceLUQHubRfnGrZbCY9Rtm6Tvk3-_1xw8/view?usp=share_link)
