// aca creamos todo el controlador del formulario//
const express=require('express');
const nodemailer=require ('nodemailer');// requerimos express y nodemaler//

const router=express.Router(); // para q lea las rutas desde express //


// aca llamamos a la ruta del Formulario//
router.get('/form',(req,res) => {
    res.render("formulario");// aca con "REnDER",mostramos contenido DINAMICO"

    });

    //para poder emitir el error(DINAMICO)//
    router.post('/enviar', async(req, res) =>{
        const { nombre, email, mensaje } = req.body;





//Validar campos
if (!nombre || !email || !mensaje){
    return res.render('formulario', { error: 'Todos los campos son obligatorios' });
}

//CONFIGURAR TRANSPORTADOR  "smtp",para recibir el mail del cliente//
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user:'francojq.93@gmail.com' ,
        pass: 'qkx fjz xih cfy otig'
    }
});  
//Configurar correro Electronico para que nos llegue//
const mailOptions={
from:email,
to: 'francojq.93@gmail.com',
subject: 'Formulario de contacto Links ',
text:`Nombre: ${nombre}\n Email:${email}\n Mensaje:${mensaje}`
};

//Try.catch estructura de control para manejar errores y excepciones
try{
//Enviar correro electronico
await transporter.sendMail(mailOptions);
res.render('confirmacion',{
    nombre: req.body.nombre
});
} catch (error){
console.log(error);
res.render('formulario', { error: 'Error al enviar mensaje'});
}


});




    // nnunca!! olvidarce de EXPORTAR EL MODULO, y lo importamos desde app.js //
    module.exports=router;