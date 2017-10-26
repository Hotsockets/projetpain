var express = require('express');
var router = express.Router();

const mymailer = require("nodemailer");

// Création de la méthode de transport de l'email
var transport = mymailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "75be3d15fe2e3d",
    pass: "e00f76308d0129"
  }
});

router.post('/sendamail', function(req, res, next) {

  // Envoi du mail test

  //console.log(req);
  transport.sendMail({
    from: req.query.name+' <'+req.query.email+'>', // Expediteur
    to: "supergrandma@yopmail.com", // Destinataires
    subject: req.query.subject, // Sujet
    text: req.query.message, // plaintext body
  }, (error, response) => {
    if(error){
      console.log(error);
    } else {
      console.log("Message sent: " + response.response);
    }
    //res.end();
  });
  //res.send('fin envoi');

});

router.get('/:myfilename', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('/'+req.params.myfilename);
});

module.exports = router;
