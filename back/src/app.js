const express = require("express");
const cors = require("cors");
const config = require("./config/server.config");
const { initConnection } = require("./database/connection.js");
const router = require("./modules/router");
var clc = require("cli-color");

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
  app.use(router);

  app.get("/", (_req, res) => res.json({ message: "hello world" }));
  app.listen(config.app.port, async () => {
    console.log(`listening on port ${config.app.port}`);
  });
})();
