import 'reflect-metadata';
import { DataSource } from "typeorm";

import 'dotenv/config';

const port = process.env.DB_PORT as number | undefined;
const logging = process.env.DATASOURCE_LOGGING as boolean | undefined;

export const AppDataSource = new DataSource({
   type: 'mysql',
   host: process.env.DB_HOST,
   port: port,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DBNAME,
   synchronize: true,
   logging:logging,
   entities: [`${__dirname}/**/entity/*.{ts,js}`],
   migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
})