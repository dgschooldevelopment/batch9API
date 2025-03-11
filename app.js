const express=require('express');
const app=express();
const mysql=require('mysql2');
const cors=require('cors');

app.use(express.json());
app.use(cors());


const db=mysql.createConnection({
    host: '195.35.45.44',
    user: 'root',
    password: 'vikram123',
    database: 'dreamsguider'
})

db.connect(()=>{
    console.log('Connected to the database')
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})



app.post('/studentDetails', (req,res)=>{
    const { id, name, address, classes, gender, contactNo}=req.body;
    // const sql='INSERT INTO batch9(id, studentName, address, class, gender, contactNo) VALUES(?,?,?,?,?,?)';
    db.query(`INSERT INTO batch9(id, stuentName, address, class, gender, contactNo) VALUES(${id},"${name}","${address}","${classes}","${gender}","${contactNo}")`,(err,result)=>{
        if(err) throw err;
        res.send("Student Data Successfully Added");

    })
})
