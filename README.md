# Fintech Application Backend

This is the backend system for a fintech application that facilitates financial transactions between users. The system is built using Node.js and TypeScript, and uses MySQL as the relational database.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing Endpoints](#testing-endpoints)
- [Postman Collection](#postman-collection)
- [Email Configuration](#email-configuration)

## Features

- User Registration and Authentication
- Automatic Wallet Creation
- Transaction Processing with Idempotency
- Transaction History
- Email alerts

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ekowamoonu/fintech-backend.git
    cd fintech-app-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Install nodemon:**

    Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. We will combine it with ts-node-dev due to our typescript

    ```bash
    npm install -g nodemon
    ```

## Database Setup

1. **Create a MySQL database:**

    Connect to your MySQL server and create a new database, and a new user.

    ```sql
    CREATE DATABASE fintechdb;
    ```

2. **Configure the database connection:**

## Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables. NB: Project uses mailtrap for sending mail:

```env
TOKEN_KEY=
APP_PORT=3000
DATASOURCE_LOGGING=true
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=
DB_PASSWORD=
DB_DBNAME=

MAIL_SENDER=
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USER=
MAIL_PASSWORD=
```

## Running The Application
 ```bash
    npm run dev
 ```
If your database has been setup correctly, this will create all required tables due to Synchronize set to true for development purposes


## Testing Endpoints & Postman Collection

A Postman collection is available for you to import and use for testing the API endpoints. Download the collection and import it into your Postman application
https://documenter.getpostman.com/view/4932254/2sA3XSC29y
You can click on "Run in postman" to immediately import the collection into your postman installation.

## Email Configuration
This project uses Mailtrap to send email. You are welcome to configure your own mail sending platforms with a few modifications needed.
