"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const request = require("request");
const initialSetup = require("./libs/initialsetup");
const app = express();

// CARGAR ARCHIVOS DE RUTAS
const project_routes = require("./routes/project");
const auth_routes = require("./routes/auth");
const user_routes = require("./routes/user");

// MIDDLEWEARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

initialSetup.createRoles();

//Carpeta estatica
app.use(express.static(path.join(__dirname, "public")));

// RUTAS
app.use("/api", project_routes);
app.use("/api", auth_routes);
app.use("/api", user_routes);

app.get("/emailVerify/:email?", (req, res) => {
  request(
    `http://apilayer.net/api/check?access_key=${process.env.APILAYER_KEY}&email=${req.params.email}&smtp=1&format=1`,
    (err, body) => {
      if (!err) {
        res.send(body.body);
      }
    }
  );
});

app.get("/", (req, res) => {
  res.send("Invalid endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

module.exports = app;
