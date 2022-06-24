require("dotenv").config();
const fs = require("fs");

const config = {
  app: {
    port: process.env.PORT,
  },
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 27017,
    dbName: process.env.DB_DATABASE,
    connectionString: `mongodb://${process.env.DB_USERNAME}:${
      process.env.DB_PASSWORD
    }@${process.env.DB_HOST}:${process.env.DB_PORT || 27017}/${
      process.env.DB_DATABASE
    }`,
  },
  auth: {
    privateKey: fs.readFileSync("./epicRoadTrip.key").toString(),
    publicKey: fs.readFileSync("./epicRoadTrip.key.pub").toString(),
    expiresIn: 3600,
    iss: process.env.AUTH_ISS || `http://localhost:${PORT}`,
    aud: process.env.AUTH_AUD || `http://localhost:${PORT}`,
    algorithm: process.env.AUTH_ALGORITHM || "RS256",
  },
  client: {
    url: process.env.FRONT_URL || "http://localhost:3000",
  },
  apis: {
    lyko: {
      apiKey: process.env.LYKO_API_KEY || null,
    },
    rapidApi: {
      apiKey: process.env.RAPID_API_KEY || null,
    },
    predictHq: {
      apiKey: process.env.PREDICTHQ_API_KEY || null,
    },
    ticketMaster: {
      apiKey: process.env.TICKETMASTER_API_KEY || null,
    },
  },
};
module.exports = config;
