const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();






app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5501', // replace with your frontend url,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] // replace with your required headers,
}));


const db = mysql.createConnection({
    host: process.env.DB_HOST || '195.35.45.44',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'vikram123',
    database: process.env.DB_NAME || 'dreamsguider',

})


db.connect(() => {
    console.log('Connected to the database');
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
} 
);


app.post('/addDetails', (req, res) => {
    const { id, studentName, address, classes, gender, contact } = req.body;

    const sql = 'INSERT INTO batch9(id, stuentName, address, class, gender, contactNo) VALUES (?,?,?,?,?,?)';
    db.query(sql, [id, studentName, address, classes, gender, contact], (err, result) => {
        if (err) throw err;

        res.send('Data inserted successfully');
        console.log('Data inserted successfully');
    })
})