import "dotenv/config";
import express from "express";
import cors from "cors";
import * as db from "./db/index.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//GET all restaurants
app.get("/getRestaurants", (req, res) => {
  //sending back to the client
  res.status(200).json({
    status: "success",
    data: {
      restaurants: ["mcdonals", "KFC"],
    },
  });
});

//GET individual restaurants
app.get("/getRestaurants/:id", (req, res) => {
  //params value from request which is :id, anything after : is params
  console.log(req.params);
  //sending back to the client
  res.status(200).json({
    status: "success",
    data: {
      restaurants: "mcdonals",
    },
  });
});

//POST create restaurants
app.post("/getRestaurants", (req, res) => {
  console.log(req.body);
  //sending back to the client
  res.status(201).json({
    status: "success",
    data: {
      restaurants: "mcdonals",
    },
  });
});

//PUT update restaurants
app.put("/getRestaurants/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  //sending back to the client
  res.status(200).json({
    status: "success",
    data: {
      restaurants: "mcdonals",
    },
  });
});

//DELETE restaurants
app.delete("/getRestaurants/:id", (req, res) => {
  //sending back to the client, no restaurant to return like the rest because we deleted them
  res.status(200).json({
    status: "success",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
