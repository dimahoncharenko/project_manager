import { DataSource } from "typeorm";
import { v4 } from "uuid";

import { Client } from "../models/Client";
import { Project } from "../models/Project";

export default {
  Query: {
    async allClients(parent: unknown, args: unknown, context: DataSource) {
      try {
        const res: Client[] = await context.query(`
          SELECT * FROM clients;
        `);

        return res;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
    async client(
      parent: unknown,
      args: GQL.IClientOnQueryArguments,
      context: DataSource
    ) {
      try {
        const res = await context.manager.findOne(Client, {
          where: {
            id: args.input.id,
          },
        });

        return res;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
    async allProjects(parent: unknown, args: unknown, context: DataSource) {
      try {
        const res: Project[] = await context.query(`
          SELECT *
          FROM projects;
        `);

        return res;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
    async project(
      parent: unknown,
      args: GQL.IProjectOnQueryArguments,
      context: DataSource
    ) {
      try {
        const res = await context.manager.findOne(Project, {
          where: { id: args.input.id },
        });

        return res;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
  },
  Mutation: {
    async addClient(
      _: unknown,
      { input }: GQL.IAddClientOnMutationArguments,
      context: DataSource
    ) {
      try {
        const newClient = new Client();

        newClient.name = input.name;
        newClient.email = input.email;
        newClient.phone = input.phone;

        const saved = await context.manager.save(newClient);

        return saved;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
    async deleteClient(
      _: unknown,
      { input }: GQL.IDeleteClientOnMutationArguments,
      context: DataSource
    ) {
      try {
        const projects = await context.manager.find(Project, {
          where: {
            clientID: input.id,
          },
        });

        for await (const project of projects) {
          project.remove();
        }

        await context.manager.delete(Client, { id: input.id });
        return true;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
    async updateClient(
      _: unknown,
      // @ts-ignore
      { id, username, phone, email }: GQL.IUpdateClientArgs,
      context: DataSource
    ) {
      try {
        await context.manager.update(
          Client,
          { id },
          {
            name: username!,
            phone,
            email,
          }
        );

        const res = await context.manager.findOneBy(Client, {
          id,
        });

        return res;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
    async addProject(
      _: unknown,
      { input }: GQL.IAddProjectOnMutationArguments,
      context: DataSource
    ) {
      try {
        const newProject = new Project();

        newProject.name = input.name;
        newProject.description = input.description!;
        newProject.status = input.status!;
        newProject.clientID = input.clientID!;

        let client = null;

        if (input.clientID?.trim()) {
          client = await context.manager.findOne(Client, {
            where: {
              id: input.clientID,
            },
          });
        }

        const saved = await context.manager.save(newProject);

        return { ...saved, client: { ...client } };
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
    async deleteProject(
      _: unknown,
      { input }: GQL.IDeleteProjectOnMutationArguments,
      context: DataSource
    ) {
      try {
        await context.manager.delete(Project, { id: input.id });
        return true;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
    async updateProject(
      _: unknown,
      { input }: GQL.IUpdateProjectOnMutationArguments,
      context: DataSource
    ) {
      try {
        await context.manager.update(
          Project,
          { id: input.projectID },
          {
            name: input.name!,
            description: input.description!,
            status: input.status!,
          }
        );

        const res = await context.manager.findOneBy(Project, {
          id: input.projectID,
        });

        return res;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
  },
  Client: {
    async project(parent: Client, _: unknown, context: DataSource) {
      try {
        const projects = await context.manager.findBy(Project, {
          clientID: parent.id,
        });

        return projects;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
  },
  Project: {
    async client(parent: Project, _: unknown, context: DataSource) {
      try {
        const client = parent.clientID
          ? await context.manager.findOne(Client, {
              where: {
                id: parent.clientID,
              },
            })
          : null;

        return client;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
          return err;
        }
      }
    },
  },
};
