import "dotenv/config";
import express from "express";
import cors from "cors";
import * as db from "./db/index.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

//GET all restaurants
app.get("/getRestaurants", async (req, res) => {
  //in express, we always wrap asyn with try catch block
  try {
    const results = await db.query("select * FROM restaurants");
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
  try {
    const { name, location, price_range } = req.body;
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [name, location, price_range]
    );
    //sending back to the client
    res.status(201).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//PUT update restaurants
app.put("/getRestaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, price_range } = req.body;
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [name, location, price_range, id]
    );

    //sending back to the client
    res.status(200).json({
      status: "success",
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE restaurants
app.delete("/getRestaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      id,
    ]);
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
