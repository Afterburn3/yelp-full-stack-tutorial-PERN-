import "dotenv/config";
import express from "express";
import cors from "cors";
import * as db from "./db/index.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

//GET all restaurants
app.get("/getRestaurants", async (req, res) => {
  //in express, we always wrap asyn with try catch block
  try {
    const results = await db.query("select * FROM restaurants");
    console.log(results);
    //sending back to the client
    res.status(200).json({
      status: "success",
      //best practice to returns the size of the rows
      results: results.rows.length,
      data: {
        //rows because that is where the data is store
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//GET individual restaurants
app.get("/getRestaurants/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [
      id,
    ]);
    //sending back to the client
    //sending back to the client
    res.status(200).json({
      status: "success",
      //best practice to returns the size of the rows
      results: results.rows.length,
      data: {
        //rows because that is where the data is store
        restaurants: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//POST create restaurants
app.post("/getRestaurants", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    //sending back to the client
    res.status(201).json({
      status: "success",
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
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
