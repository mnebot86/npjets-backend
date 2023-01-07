import { buildSchema } from 'graphql';
//TODO: add rosterSize to type Group

const schemaBuild = buildSchema(`
    type Parent {
        _id: ID!
        user: User!
        name: String!
        lastName: String!
        picture: String!
        children: [Player]!
        phone: String!
        message: String
    }

    input ParentInput {
        user: String!
        name: String!
        lastName: String!
        picture: String!
        phone: String!
    }

    input ParentEditInput {
        name: String
        lastName: String
        picture: String
        children: [ID]
        phone: String
    }

    type TeamMom {
        _id: ID!
        user: User!
        name: String!
        lastName: String!
        picture: String!
        group: Group!
        phone: String!
        cleanBGC: Boolean!
        message: String
    }

    input TeamMomInput {
        user: String!
        name: String!
        lastName: String!
        picture: String!
        group: String!
        phone: String!
    }

    input TeamMomEditInput {
        user: String
        name: String
        lastName: String
        picture: String
        group: String
        phone: String
        cleanBGC: Boolean
    }

    type Player {
        _id: ID!
        user: User!
        parents: [Parent]!
        isCaptain: Boolean!
        name: String!
        lastName: String!
        picture: String!
        jerseyNumber: Int,!
        positions: String,
        weight: Int!
        isStriper: Boolean,
        birthday: String!
        age: Int!
        grade: Int!
        group: Group!
        registrationPaid: Boolean
        fundraiserCompleted: Boolean
        receivedGear: Boolean
        returnedGear: Boolean,
        hasAllergy: Boolean,
        allergyList: [String]!
        totalAbsence: Int!
        createdAt: String!
        message: String
    }

    input PlayerInput {
        user: ID!
        name: String!
        parents: [ID]!
        lastName: String!
        picture: String!
        weight: Int!
        birthday: String!
        age: Int!
        grade: Int!
        group: ID!
        hasAllergy: Boolean,
        allergyList: [String!]
    }

    input PlayerEditInput {
        isCaptain: Boolean
        name: String
        parents: [ID]
        lastName: String
        picture: String
        jerseyNumber: Int
        positions: String
        weight: Int
        isStriper: Boolean
        birthday: String
        age: Int
        grade: Int
        group: ID
        registrationPaid: Boolean
        fundraiserCompleted: Boolean
        receivedGear: Boolean
        returnedGear: Boolean
        hasAllergy: Boolean
        allergyList: [String]
        totalAbsence: Int
        createdAt: String
    }

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
        message: String
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
        message: String
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
        player(playId: ID!): Player!
        players: [Player!]!
        teamMom(teamMomId: ID!): TeamMom!
        teamMoms: [TeamMom!]!
        parent(parentId: ID!): Parent!
        parents: [Parent!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createCoach(coachInput: CoachInput): Coach
        updateCoach(coachId: ID!, coachInput: CouchEditInput): Coach
        deleteCoach(coachId: ID!): Coach
        createGroup(groupInput: GroupInput): Group
        updateGroup(groupId: ID!, groupInput: GroupEditInput): Group
        deleteGroup(groupId: ID!): Group
        createPlayer(playerInput: PlayerInput): Player
        updatePlayer(playerId: ID!, playerInput: PlayerEditInput): Player
        deletePlayer(playerId: ID!): Player
        createTeamMom(teamMomInput: TeamMomInput): TeamMom
        updateTeamMom(teamMomId: ID!, teamMomInput: TeamMomEditInput): TeamMom
        deleteTeamMom(teamMomId: ID!): TeamMom
        createParent(parentInput: ParentInput): Parent
        updateParent(parentId: ID!, parentInput: ParentEditInput): Parent
        deleteParent(parentId: ID!): Parent
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

export default schemaBuild;
