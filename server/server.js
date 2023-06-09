'use strict';

// load packages
const path = require("path")
const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


let con = mysql.createConnection({
    host: 'mysql',
    port: '3306',
    user: 'root',
    database: 'project',
    password: 'admin'
});


const PORT = 8080;
const HOST = '0.0.0.0';

// Connect to database
app.get('/', (err, data) => {
    con.connect(function(err) {
        if (err) throw err;
        else console.log('Connected\n');
    });
});

///////////////////////////////////////////////////////////////////// staff
// insert staff info into staff table
app.post('/staffRegister', (req, res) => {
    // get info from client
    var LastName = req.body.LastName;
    var FirstName = req.body.FirstName;
    var ID = req.body.ID;
    var Gender = req.body.Gender;
    var Age = req.body.Age;
    var Occupation = req.body.Occupation;

    // insert into staff table
    var sql = `INSERT INTO staff (ID, LastName, FirstName, Gender, Age, Occupation) VALUES ('${ID}', '${LastName}', '${FirstName}', '${Gender}', '${Age}', '${Occupation}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Insertion complete!\n");
    });
    res.send('ok');
});


// change info of a staff in staff table
app.post('/staffChange', (req, res) => {
    // get info from client
    var ID = req.body.ID;
    var changeValue = req.body.changeValue;
    var choice = req.body.choice;
    var changeType;

    if (choice == 'changeID') { changeType='ID'; var sql = `UPDATE staff SET ${changeType}=${changeValue} WHERE ID=${ID}`;}
    if (choice == 'changeLastName')  { changeType='LastName'; var sql = `UPDATE staff SET ${changeType}='${changeValue}' WHERE ID=${ID}`;}
    if (choice == 'changeFirstName') { changeType='FirstName'; var sql = `UPDATE staff SET ${changeType}='${changeValue}' WHERE ID=${ID}`;}
    if (choice == 'changeGender') { changeType='Gender'; var sql = `UPDATE staff SET ${changeType}='${changeValue}' WHERE ID=${ID}`;}
    if (choice == 'changeAge') {changeType='Age'; var sql = `UPDATE staff SET ${changeType}=${changeValue} WHERE ID=${ID}`;}
    if (choice == 'changeOccupation') { changeType='Occupation'; var sql = `UPDATE staff SET ${changeType}='${changeValue}' WHERE ID=${ID}`;}
    
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Change complete!\n");
    });
    res.send('ok');
});


// delete staff by his or her ID from staff table
app.post('/staffDelete', (req, res) => {
    // get ID from client
    var ID = req.body.ID;

    // delete satff from staff table
    var sql = `DELETE FROM staff WHERE ID='${ID}'`;
    con.query(sql, function (err, result) {
        if (err) console.log("The given ID is not found in the satff table./n");
        console.log("Deletion complete!\n");
    });
    res.send('ok');
});


//////////////////////////////////////////////////////////////////// customer
// insert customer's info into customer table
app.post('/customerRegister', (req, res) => {
    // get info from client
    var LastName = req.body.LastName;
    var FirstName = req.body.FirstName;
    var ID = req.body.ID;
    var Gender = req.body.Gender;
    var Age = req.body.Age;

    // insert into customer table
    var sql = `INSERT INTO customer (ID, LastName, FirstName, Gender, Age) VALUES ('${ID}', '${LastName}', '${FirstName}', '${Gender}', '${Age}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Insertion complete!\n");
    });
    res.send('ok');
});


// update customer's info into customer table
app.post('/customerUpdate', (req, res) => {
    // get info from client
    var ID = req.body.ID;
    var changeValue = req.body.changeValue;
    var choice = req.body.choice;
    var changeType;

    if (choice == 'changeID') { changeType='ID'; var sql = `UPDATE customer SET ${changeType}=${changeValue} WHERE ID=${ID}`;}
    if (choice == 'changeLastName')  { changeType='LastName'; var sql = `UPDATE customer SET ${changeType}='${changeValue}' WHERE ID=${ID}`;}
    if (choice == 'changeFirstName') { changeType='FirstName'; var sql = `UPDATE customer SET ${changeType}='${changeValue}' WHERE ID=${ID}`;}
    if (choice == 'changeGender') { changeType='Gender'; var sql = `UPDATE customer SET ${changeType}='${changeValue}' WHERE ID=${ID}`;}
    if (choice == 'changeAge') {changeType='Age'; var sql = `UPDATE customer SET ${changeType}=${changeValue} WHERE ID=${ID}`;}
    if (choice == 'changeSummaryOfConsultation') { changeType='SummaryOfConsultation'; var sql = `UPDATE customer SET ${changeType}='${changeValue}' WHERE ID=${ID}`;}

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Change complete!\n");
    });
    res.send('ok');
});


// delete customer by his or her ID from customer table
app.post('/customerDelete', (req, res) => {
    // get ID from client
    var ID = req.body.ID;

    // delete customer from customer table
    var sql = `DELETE FROM customer WHERE ID='${ID}'`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Deletion complete!\n");
    });
    res.send('ok');
});


// show info about customers
app.post('/customerShow', (req, res) => {

    var sql = `SELECT * FROM customer;`;
    var response = '';

    con.query(sql, function (err, result){
        if (err) throw err;
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            response += "ID: " + row.ID + 
                        "\nLastName: " + row.LastName + 
                        "\nFirstname: " + row.FirstName + 
                        "\nGender: " + row.Gender + 
                        "\nAge: " + row.Age +
                        "\nSummary Of Consultation: " + row.SummaryOfConsultation +
                        "\n\n";
        });
        res.send(response);     
    });
});

// show  customers
app.post('/customerShowOnly', (req, res) => {

    var sql = `SELECT * FROM customer;`;
    var response = '';

    con.query(sql, function (err, result){
        if (err) throw err;
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            response +=  "\nLastName: " + row.LastName + 
                        "\nFirstname: " + row.FirstName + 
                        "\n\n";
        });
        res.send(response);     
    });
});

app.use("/", express.static(path.join(__dirname, "pages")));
app.listen(PORT, HOST);
console.log("up and running!");
