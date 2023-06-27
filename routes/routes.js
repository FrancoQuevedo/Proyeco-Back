const { Router } = require('express');
const router = new Router();

const express = require("express");
const session = express.Router();
const connection = require("../database");
const sessions = require('./sessions');

let errorMessage = "";


//***** ingreso links ***  */

//RUTA//
// SELECT : (NUESTRA VISTA GENERAL"/" NI BIEN ARBRIMOS LA APP/HOME)
session.get('/link', (req, res) => {
    let sql = "SELECT * FROM links";
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.render('../views/links.hbs', {
            results: results
        });
    });
});


// Insert 
//maneja la solicitud POST p/ guardar un nuevo produdcto en la baseD.utilizando ,
//los datos enunciadps en el cuerpo de la solicitud y luego redirige al usuario a la pagina
session.post('/save', (req, res) => {
    let data = { link_url: req.body.link_url, link_nombre: req.body.link_nombre };
    let sql = "INSERT INTO links SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/link');
    });
});

//update para actualizaar
session.post('/update', (req, res) => {
    let sql = "UPDATE links SET link_url='" + req.body.link_url + "', link_nombre='" + req.body.link_nombre + "' WHERE link_id=" + req.body.id;
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/link');
    });
});
//DELETE
session.post('/delete', (req, res) => {
    let sql = "DELETE FROM links WHERE link_id=" + req.body.link_id + "";
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/link');
    });
});




//*******Registro****** //


session.get("/", (req, res) => {
    res.render("index",/* { errorMessage } */);
});


session.post("/login", (req, res) => {
    if (!req.body || !req.body.username || !req.body.password){

  /*       else { errorMessage = "Incorrect user or password.";
        res.render("index", { errorMessage });  */


        

/*    res.send("<script>alert('Usuario invalido');</script>");  */


      /*    return; */
     { errorMessage ="Please complete all fields.";
      res.render("index", { errorMessage });
      return;
       
    }
}
    

    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            req.session.loggedIn = true;
            req.session.username = username;
            res.redirect("/home");
        } else { errorMessage = "Incorrect user or password.";
        res.render("index", { errorMessage });
         
        
        };
  
        });

    });


session.get("/home", (req, res) => {
    if (req.session.loggedIn) {
        res.render("home", { username: req.session.username });
    } else {
        res.redirect("/");
    }
});

session.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

/* }); */


module.exports = session;

