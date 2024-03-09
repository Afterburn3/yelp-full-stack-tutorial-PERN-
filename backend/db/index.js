import pg from "pg"; //Import pg
const { Pool } = pg; //const pool from pg

const pool = new Pool({
  //database authentification set up, for attack purposes, put it in .env
  host: "localhost",
  user: "postgres",
  password: "lolimthebest",
  port: 5432,
  database: "Yelp",
});

export const query = (text, params, callback) => {
  //Call back to main file
  return pool.query(text, params, callback);
};
