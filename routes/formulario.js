const express=require('express');
const nodemailer=require ('nodemailer');

const router=express.Router(); 


//llamamos a la ruta del Formulario//
router.get('/form',(req,res) => {
    res.render("formulario");

    });

    // error(DINAMICO)//
    router.post('/enviar', async(req, res) =>{
        const { nombre, email, mensaje } = req.body;


if (!nombre || !email || !mensaje){
    return res.render('formulario', { error: 'Todos los campos son obligatorios' });
}

//CONFIGURAR TRANSPORTADOR  "smtp"//
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user:'francojq.93@gmail.com' ,
        pass: 'qkx fjz xih cfy otig'
    }
});  

const mailOptions={
from:email,
to: 'francojq.93@gmail.com',
subject: 'Formulario de contacto Links ',
text:`Nombre: ${nombre}\n Email:${email}\n Mensaje:${mensaje}`
};


try{

await transporter.sendMail(mailOptions);
res.render('confirmacion',{
    nombre: req.body.nombre
});
} catch (error){
console.log(error);
res.render('formulario', { error: 'Error al enviar mensaje'});
}


});


    module.exports=router;