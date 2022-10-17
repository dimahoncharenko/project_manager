import { DataSource } from "typeorm";
import { config } from "dotenv";

import { Client } from "../models/Client";
import { Project } from "../models/Project";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Client, Project],
  subscribers: [],
  migrations: [],
});
