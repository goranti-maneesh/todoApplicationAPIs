const express = require("express");
const app = express();

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const dataBasePath = path.join(__dirname, "todoApplication.db");

let dataBase = null;

const initializeDBAndServer = async () => {
  try {
    dataBase = await open({
      filename: dataBasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000);
  } catch (e) {
    console.log(`Database error ${e.message}`);
  }
};

initializeDBAndServer();

app.get("/todos/", async (request, response) => {
  const setQuery = `SELECT * FROM todo`;
  const responseBody = await dataBase.all(setQuery);
  response.send(responseBody);
});
