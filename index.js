const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// ✅ Enable CORS
app.use(cors({
    origin: '*',  // Change '*' to your frontend URL if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Handle Preflight Requests
app.options('*', cors());

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ MySQL Database Connection
const db = mysql.createPool({
    host: process.env.DB_HOST || '195.35.45.44',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'vikram123',
    database: process.env.DB_NAME || 'dreamsguider',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err) => {
    if (err) {
        console.error('Database Connection Failed:', err);
    } else {
        console.log('✅ Connected to MySQL Database');
    }
});

// ✅ API Endpoint to Insert Data
app.post('/addDetails', (req, res) => {
    const { id, studentName, address, classes, gender, contact } = req.body;

    // ✅ Fix SQL Query (corrected column name)
    const sql = 'INSERT INTO batch9 (id, studentName, address, class, gender, contactNo) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [id, studentName, address, classes, gender, contact], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.status(200).json({ message: 'Data inserted successfully' });
        console.log('✅ Data inserted successfully');
    });
});



app.post('/signUp', (req, res) => {
    const { username, password, contactNo } = req.body;

    // ✅ Fix SQL Query (corrected column name)
    const sql = 'INSERT INTO user (username,password,contactNo) VALUES (?, ?, ?)';

    db.query(sql, [username, password, contactNo], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.status(200).json({ message: 'Sign up successfully' });
        console.log('✅ Sign up successfully');
    });
});



app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // ✅ Fix SQL Query (corrected column name)
    const sql = 'SELECT * FROM user WHERE username =? AND password =?';

    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({
                succes: false,
            });
        }
        if (result.length === 0) {
            return res.status(401).json({
                succes: false,
            });
        }
        res.status(200).json({
            succes: true,
            user: result[0]
        });

        console.log('Login successful');
    });
})

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
