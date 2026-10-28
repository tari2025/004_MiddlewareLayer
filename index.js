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
//middleware untuk validasi body
function validateBody(schema) {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            convert: true,
            allowUnknown: false,
        });
        if (error) { 
            return errorResponse(res, "Validation input gagal", 400, errorDetails.map(item => ({
                field: item.path.join('.'),
                message: item.message 
                
            })));
            req. body = value;
            next();
        }
    };
    //middleware untuk validasi params
    function validateParams(schema) {
        return (req, res, next) => {
            const { error, value } = schema.validate(req.params, {

        
            });
            if (error) {
                return errorResponse(
                    res, 'Parameter tidak valid', 400, 
                    errorDetails.map(item => ({
                        field: item.path.join('.'),
                        message: item.message
                    }))
                );
            }
            req.params = value;
            next();
        };
    }
    //endpoint untuk get
app.get('/', async (req, res) => {
        const result = await pool.query(
            'SELECT * FROM biodata ORDER BY id');  
)

return successResponse(
    res, 
    'Data berhasil diambil', 
    result.rows);
)
})

//endpoint post mengirim data ke database
app.post(
    '/biodata',
    validateBody(biodataSchema),
    async (req, res) => {   
        const { id, nama, nim, kelas } = req.body;  

        conts result = await pool.query(
            'INSERT INTO biodata (id, nama, nim, kelas) 
            VALUES ($1, $2, , $4) 
            RETURNING *',
            [id ?? null, nama, nim, kelas]  

)
        return successResponse(
            res, 
            'Data berhasil ditambahkan', 
            result.rows[0], 
            201);   
        )
    )
)
}
app.put(
    '/biodata',
    validateParams(idSchema),
    validateBody(biodataSchema.fork(
            ['nama', 'nim', 'kelas'],
            field => field.required()
    ).fork(['id'], field => field.forbidden())),
    async (req, res) => {   
        const { id } = req.params;
        const { nama, nim, kelas } = req.body;  

        const result = await pool.query(
            'UPDATE biodata 
            SET nama = $1, nim = $2, kelas = $3 
            WHERE id = $4 
            RETURNING *',
            [nama, nim, kelas, id]  


)