var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
var nodemailer = require("nodemailer");
router.post('/', async (req, res, next) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var mensaje = req.body.mensaje;
  var obj = {
    to: 'matiasspennino@gmail.com',
    subject: 'contacto web',
    html: nombre + " " + apellido + " se comunico con este correo " + email + ". <br> su mensaje fue el siguiente: " + mensaje
  }
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index', {
    mensaje: 'mensaje enviado correctamente'
  });

});

module.exports = router;
