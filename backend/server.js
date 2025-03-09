const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const helmet = require("helmet");
const { pool, connectMongoDB } = require("./database");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// connect-mongodb
connectMongoDB();

// graphql-server
async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`server-running: http://localhost:${PORT}`);
        console.log(`graphql-server: http://localhost:${PORT}/graphql`);
    });
}

startApolloServer();
