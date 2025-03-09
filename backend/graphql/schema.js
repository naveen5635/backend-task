const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Job {
        id: ID!
        title: String!
        description: String!
        company: String!
        location: String!
        created_at: String
    }

    type Application {
        id: ID!
        job_id: ID!
        applicant_name: String!
        applicant_email: String!
        cover_letter: String!
        submitted_at: String
    }

    type Query {
        jobs: [Job]
        job(id: ID!): Job
        applications(job_id: ID!): [Application]
    }

    type Mutation {
        addJob(title: String!, description: String!, company: String!, location: String!): Job
        applyForJob(job_id: ID!, applicant_name: String!, applicant_email: String!, cover_letter: String!): Application
    }
`;

module.exports = typeDefs;
