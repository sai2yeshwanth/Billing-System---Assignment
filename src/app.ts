import express, { Request, Response } from "express";
import "dotenv/config";
import bodyParser from "body-parser";

import dbInit from "./db/init";
import routes from "./routes";
const cors: any = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors()); // enable cors
// Body parsing Middleware
app.use(express.json()); // josn middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database initialization
dbInit();

//Intialising routes
app.use("/api/v1", routes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
