import express from "express";
import pg from "pg";
import joi from 'joi'

const app = express();
const port = 3000;
const { pool } = pg 

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "mahasiswa",
  password: "1234",
  port: 5432,
}); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware logging
app.use((req, res, next) => {
  cons start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;


    console.log({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });
  
  next();
});