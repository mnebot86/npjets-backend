import { buildSchema } from 'graphql';

const schemaBuild = buildSchema(`
    type Coach {
        _id: ID!
        user: User!
        name: String!
        lastName: String!
        picture: String!
        position: String!
        phone: String!
        cleanBGC: Boolean!
    }

    input CoachInput {
        user: ID!
        name: String!
        lastName: String!
        picture: String!
        position: String!
        phone: String!
        cleanBGC: Boolean!
    }

    input CouchEditInput {
        name: String
        lastName: String
        picture: String
        position: String
        phone: String
        cleanBGC: Boolean
    }

    type User {
        _id: ID!
        email: String!
        password: String
        roleType: String!
        role: ID
    }

    input UserInput {
        email: String!
        password: String!
        roleType: String!
    }

    type RootQuery {
        users: [User!]!
        coaches: [Coach!]!
        coach(coachId: ID!): Coach!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createCoach(coachInput: CoachInput): Coach
        updateCoach(coachId: ID!, coachInput: CouchEditInput): Coach
        deleteCoach(coachId: ID!): Coach
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

export default schemaBuild;
