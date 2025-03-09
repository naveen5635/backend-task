const { Pool } = require("pg");
const mongoose = require("mongoose");
require("dotenv").config();

// postgresql-connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// mongodb-connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("mongodb: done ✅");
    } catch (err) {
        console.error("mongodb: error ❌", err);
        process.exit(1);
    }
};

module.exports = { pool, connectMongoDB };
