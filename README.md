# Fintech Application Backend

This is the backend system for a fintech application that facilitates financial transactions between users. The system is built using Node.js and TypeScript, and uses MySQL as the relational database.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
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
    git clone https://github.com/ekowamoonu/fintech-app-backend.git
    cd fintech-app-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Install nodemon:**

    Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

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
TOKEN_KEY=123456789
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
