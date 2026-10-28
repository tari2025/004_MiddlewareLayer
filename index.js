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
//response envelope
function successResponse(res, message, data, status = 200) {
  return res.status(status).json({
    status: true,
    message,
    data
    error: null
  });
}
function errorResponse(res, message, status, detail = null) {
  return res.status(status).json({
    status: false,
    message,
    data: null,
    error: detail   
  });
}
//joi validation schema
const biodataSchema = joi.object({
    id: joi.number().integer().positive(),
    nama: joi.string().trim().min(2).max(100).required(),
    nim: joi.string().trim().min(5).max(20).required(),
    kelas: joi.string().trim().min(1).max(20).required(),
})
const idSchema = joi.object({
    id: joi.number().integer().positive().required()
})  