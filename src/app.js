const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const graphqlHttp = require("express-graphql");

const graphQlSchema = require("./graphql/schema");
const grapQlResolvers = require("./graphql/resolvers");

const isAuth = require("./middleware/is-auth");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "frontend")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// app.route('/')
// 	.get(function (req, res) {
// 		res.status(200).send("Hydro Hub Server is ready.");
// 	});

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/hydro-hub",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: grapQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to Database. Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
