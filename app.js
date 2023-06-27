const express= require('express');
const hbs = require ('hbs');
const session = require("express-session");
const port=5002;             
const app= express(); 
const router=require("./routes/formulario");
                  

const mysql = require("mysql2"); //?                    

const configureSession = require ("./routes/sessions");
const sessionRoutes = require("./routes/routes");
     
//configurar hbs como motor de plantilla
app.set('view engine','hbs');       
hbs.registerPartials(__dirname+'/views/partials');        
  
//COonfigurar directorio de VISTAS(views)// 
/* app.set('views', __dirname +'/views');
 */                            
  
//Configurar Express para datos estaticos
app.use("/assets", express.static(__dirname +'/public'));
                              
// Configurar Express para procesar datos/solicitudes de formulario(xq vienen en JSON,ESTE CODIGO 
//LOSPROCESA)//
app.use(express.json());
app.use(express.urlencoded({extended:false}));
          
              
// conecte con databse//
configureSession(app);
       
          
 
app.use ('/', sessionRoutes ); 
       

///llamamos ala base datos//
app.use(require("./routes/routes"));
 // para que lea las rutas del Form 
app.use('/', router)
 
         

//configuramos el puerto que vamos usar.llamando al puerto//
app.listen(port,() => {
    console.log(`Usando EL PUERTO  http://localhost:${port}`);
    });        