const express = require("express");
const cors = require("cors");
const config = require("./config/server.config");
const yamljs = require("yamljs");
const { initConnection } = require("./database/connection.js");
const router = require("./modules/router");
var clc = require("cli-color");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = yamljs.load("./swagger.yaml");

(async () => {
  const app = express();
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());

  await initConnection({ verbose: true });

  app.use((req, _, next) => {
    console.log(clc.green.underline(`${req.ip} ${req.originalUrl}`));
    next();
  });

  app.all("/ping", (_req, res) => res.json({ message: "pong" }));
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/", router);

  app.listen(config.app.port, async () => {
    console.log(`listening on port ${config.app.port}`);
  });
})();
