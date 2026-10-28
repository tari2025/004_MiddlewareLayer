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
