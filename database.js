const mysql = require("mysql2");


//Configuracion de la conexion a base de datos//
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_node2"
});


// CONEXION a la base de datos//
connection.connect((err) => {
    if (err) throw err;

    console.log("Conectado a base de datos Mysql");
});


module.exports = connection;
