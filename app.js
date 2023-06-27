const express = require('express');
const hbs = require('hbs');
const port = 5002;
const app = express();
const router = require("./routes/formulario");

const configureSession = require("./routes/sessions");
const sessionRoutes = require("./routes/routes");




app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');



app.use("/assets", express.static(__dirname + '/public'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// Conecct con databse//
configureSession(app);


app.use('/', sessionRoutes);


///llamamos ala base datos//
app.use(require("./routes/routes"));

//Rutas del Form 
app.use('/', router)



// puerto //
app.listen(port, () => {
    console.log(`Usando EL PUERTO  http://localhost:${port}`);
});        