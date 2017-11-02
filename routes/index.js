var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const mymailer = require("nodemailer");
const config = require('../config.js');

const connection = mysql.createConnection(config);

connection.connect();


router.get('/' ,function(req, res, next){
  res.render('index')
});

router.get('/contact' ,function(req, res, next){
  res.render('formulaire')
});

router.get('/produits' ,function(req, res, next){
  connection.query('SELECT * FROM products;', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.render('produits', {products:results});
  });
});

router.get('/login' ,function(req, res, next){
  res.render('login')
});


// admin login
router.post('/login', function(req, res, next) {
  console.log(req.body);
  let name = req.body.login;
  let pass = req.body.password;
  console.log(name, pass);
  connection.query('SELECT * FROM users WHERE login = ? AND password = ? ;',[name, pass],function (error, results, fields) {
    if (error) throw error;
    if (results.length === 0) {
      res.redirect('/');
    } else {
      req.session.connected = true;
      req.session.cookie.maxAge = 3600000; // 1 heure
      console.log(req.session);
      res.redirect('/admin');
    }
  });
});

// admin logout
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});


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

// // router.get('/:myfilename', function(req, res, next) {
//   //res.render('index', { title: 'Express' });
//   res.sendFile('/'+req.params.myfilename);
// });

module.exports = router;
