const express = require('express');
const app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/'));
app.set('view engine', 'html');

//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database:'weekproject'
});

// Connect
db.connect((err) => {
    if(err){
        console.log(err);
    }
    console.log('MySql Connected...');
});

//   const app = express();

// Create db
app.get('/createdb', (req, res) => {
    res.send('Database created...'); 
    let sql = 'CREATE DATABASE weekproject';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...'); 

    });

});
app.get('/getprogram',(req, res) =>{
    let sql= `SELECT * FROM  program`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('fetched...');
    });
    console.log(sql);

});
app.get('/getprogram2/:id',(req, res) =>{
    console.log(req.params.id)
    let sql= "SELECT * FROM program WHERE programName = " +mysql.escape(req.params.id);
    let query = db.query(sql, (err, results) => {
        if(err) {
            console.log(err);
            res.json({"error":true});
        }else{
        console.log(results);
        // res.send('fetched...');

        results.forEach(function(item) {
            let sql="SELECT * FROM programUniversity WHERE programId = " +mysql.escape(item.programId);
            let query = db.query(sql, (err, results) => {
                if(err) throw err;
                console.log(results);
                // res.send('fetched...');

                results.forEach(function(item) {
                    let sql="SELECT * FROM university WHERE universityId = " +mysql.escape(item.universityId);
                    let query = db.query(sql, (err, results) => {
                        if(err) throw err;
                        console.log(results);
                        res.json(results);
                    
                });
            });
        });
    });
    console.log(sql);
        }
});
});

// app.get('/getprogram3/:id',(req, res) =>{
//     console.log(req.params.id)
//     let sql= "SELECT universityName FROM university WHERE universityId = (SELECT universityId FROM programUniversity WHERE programId= " +mysql.escape(req.params.id) + ")";
//     let query = db.query(sql, (err, results) => {
//         if(err) throw err;
//         console.log(results);
//         res.send('fetched...');
//     });
//     console.log(sql);

// });

app.listen('3000' , () => {
    console.log('Server started on port 3000');
});
