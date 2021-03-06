var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const mymailer = require("nodemailer");
const config = require('../config.js');

const connection = mysql.createConnection(config);

connection.connect();


router.get('/' ,function(req, res, next){
  connection.query('SELECT * FROM sections;', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.render('index',{sections:results});
  });
});

router.get('/contact' ,function(req, res, next){
  connection.query('SELECT * FROM sections;', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.render('formulaire',{sections:results});
  });
});

router.get('/produits' ,function(req, res, next){
  connection.query('SELECT * FROM products', function (error, results, fields) {
    console.log(results.filter(obj => obj.category == '1'));
    console.log(results.filter(obj => obj.category == '2'));
    console.log(results.filter(obj => obj.category == '3'));
    if (error) throw error;
    res.render('produits',
      {'products_cat1':results.filter(obj => obj.category == '1'),
		  'products_cat2':results.filter(obj => obj.category == '2'),
		  'products_cat3':results.filter(obj => obj.category == '3')});
  });
});

router.get('/produit-:idproduit(\\d+)' ,function(req, res, next){
  connection.query('SELECT * FROM products WHERE id='+req.params.idproduit+';', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.render('produit', {product:results[0]});
  });
});

router.get('/login' ,function(req, res, next){
  res.render('login')
});


// /login
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

// /logout
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
    user:	"bd7acc8d9be490",
    pass:	"5f44214a89c2c9"
  }
});

router.post('/sendamail', function(req, res, next) {

  // Envoi du mail test

  //console.log(req);
  transport.sendMail({
    from: req.body.name+' <'+req.body.email+'>', // Expediteur
    to: "supergrandma@yopmail.com", // Destinataires
    subject: req.body.subject, // Sujet
    text: req.body.message, // plaintext body
  }, (error, response) => {
    if(error){
      console.log(error);
    } else {
      console.log("Message sent: " + response.response);
    }
    //res.end();
  });
  res.render('message_ok');

});

// // router.get('/:myfilename', function(req, res, next) {
//   //res.render('index', { title: 'Express' });
//   res.sendFile('/'+req.params.myfilename);
// });

module.exports = router;
