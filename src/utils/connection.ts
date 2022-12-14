import { DataSource } from "typeorm";
import { config } from "dotenv";

import { Client } from "../models/Client";
import { Project } from "../models/Project";

config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host:
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_DB_HOST
      : process.env.DB_HOST,

  port: Number(process.env.DB_PORT!),

  username:
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_DB_USER
      : process.env.DB_USER,

  password:
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_DB_PASS
      : process.env.DB_PASS,

  database:
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_DB_NAME
      : process.env.DB_NAME,

  synchronize: true,
  logging: true,
  entities: [Client, Project],
});
