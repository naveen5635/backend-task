const { pool } = require("../database");
const Application = require("../models/Application");

const resolvers = {
    Query: {
        jobs: async () => {
            const result = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
            return result.rows;
        },
        job: async (_, { id }) => {
            const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
            return result.rows[0];
        },
        applications: async (_, { job_id }) => {
            return await Application.find({ job_id: job_id });
        }
    },
    Mutation: {
        addJob: async (_, { title, description, company, location }) => {
            const result = await pool.query(
                "INSERT INTO jobs (title, description, company, location, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
                [title, description, company, location]
            );
            return result.rows[0];
        },
        applyForJob: async (_, { job_id, applicant_name, applicant_email, cover_letter }) => {
            console.log("🔍 Received Application Data:", job_id, applicant_name, applicant_email, cover_letter);
            
            try {
                // save-job_id-as-a-str, from-psql
                const newApplication = new Application({ 
                    job_id: job_id.toString(), 
                    applicant_name, 
                    applicant_email, 
                    cover_letter 
                });

                const savedApplication = await newApplication.save();
                console.log("application: done ✅", savedApplication);
                return savedApplication;
            } catch (error) {
                console.error("application: error ❌", error.message);
                throw new Error("submission-failed");
            }
        }
    }
};

module.exports = resolvers;
