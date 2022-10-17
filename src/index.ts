import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import expPlay from "graphql-playground-middleware-express";
import { readFileSync } from "fs";
import { resolve } from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import resolvers from "./graphql/resolvers";
import { AppDataSource } from "./utils/connection";

config();

const typeDefs = readFileSync(resolve("src/graphql/typeDefs.graphql"), "utf8");

const PORT = process.env.PORT || 6000;

(async () => {
  try {
    const app = express();
    app.use(cors());
    app.use(
      "/playground",
      expPlay({
        endpoint: "/graphql",
      })
    );

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    await AppDataSource.initialize();

    const server = new ApolloServer({
      schema,
      context() {
        return AppDataSource;
      },
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => console.log(`Server running on port: ${PORT}!`));
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      process.exit(1);
    }
  }
})();
