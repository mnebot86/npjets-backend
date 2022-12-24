import { buildSchema } from 'graphql';
//TODO: add rosterSize to type Group

const schemaBuild = buildSchema(`
    type Group {
        _id: ID!
        name: String!
        coaches: [Coach]!
        ageAllowance: Int!
        wins: Int!
        loses: Int!
        draws: Int!
        ranking: Int
        isInPlayoff: Boolean
        isArchive: Boolean
        createdAt: String!
        message: String
    }

    input GroupInput {
        name: String!
        ageAllowance: Int!
    }

    input GroupEditInput {
        name: String
        ageAllowance: Int
        wins: Int
        loses: Int
        draws: Int
        ranking: Int
        isInPlayoff: Boolean
        isArchive: Boolean
    }

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
        coach(coachId: ID!): Coach!
        coaches: [Coach!]!
        group(groupId: ID!): Group!
        groups: [Group!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createCoach(coachInput: CoachInput): Coach
        updateCoach(coachId: ID!, coachInput: CouchEditInput): Coach
        deleteCoach(coachId: ID!): Coach
        createGroup(groupInput: GroupInput): Group
        updateGroup(groupId: ID!, groupInput: GroupEditInput): Group
        deleteGroup(groupId: ID!): Group

    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

export default schemaBuild;
