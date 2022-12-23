import { buildSchema } from 'graphql';

const schemaBuild = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
        roleType: String!
    }

    input UserInput {
        email: String!
        password: String!
        roleType: String!
    }

    type RootQuery {
        users: [User!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

export default schemaBuild;
