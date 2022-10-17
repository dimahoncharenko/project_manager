// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
allClients: Array<IClient | null> | null;
client: IClient | null;
allProjects: Array<IProject | null> | null;
project: IProject | null;
}

interface IClientOnQueryArguments {
input: IClientParams;
}

interface IProjectOnQueryArguments {
input: IProjectParams;
}

interface IClient {
__typename: "Client";
id: string | null;
name: string | null;
email: string | null;
phone: string | null;
}

interface IClientParams {
id: string;
}

interface IProject {
__typename: "Project";
id: string | null;
clientID: string | null;
name: string | null;
description: string | null;
status: string | null;
client: IClient | null;
}

interface IProjectParams {
id: string;
}

interface IMutation {
__typename: "Mutation";
addClient: IClient | null;
deleteClient: boolean | null;
addProject: IProject | null;
deleteProject: boolean | null;
updateProject: IProject | null;
}

interface IAddClientOnMutationArguments {
input: IAddClientArgs;
}

interface IDeleteClientOnMutationArguments {
input: IDeleteClientArgs;
}

interface IAddProjectOnMutationArguments {
input: IAddProjectArgs;
}

interface IDeleteProjectOnMutationArguments {
input: IDeleteProjectArgs;
}

interface IUpdateProjectOnMutationArguments {
input: IUpdateProjectArgs;
}

interface IAddClientArgs {
name: string;
phone: string;
email: string;
}

interface IDeleteClientArgs {
id: string;
}

interface IAddProjectArgs {
name: string;
description?: string | null;
status?: string | null;
clientID?: string | null;
}

interface IDeleteProjectArgs {
id: string;
}

interface IUpdateProjectArgs {
projectID: string;
name?: string | null;
description?: string | null;
status?: string | null;
}
}

// tslint:enable
