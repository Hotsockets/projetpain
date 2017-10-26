const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'tmp/' });
//const config = require('config.js');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'm1n2b3V-4',
	database : 'pain'
});

connection.connect();

// GET /admin/
router.get('/', function(req, res, next) {
	connection.query('SELECT * FROM products;', function (error, results, fields) {
	  if (error) throw error;
		res.render('admin-index', {products:results});
	  //console.log(results);
	});
	// Afficher la liste des produits de la table 'products'
	//;
});

// GET /admin/create-product
router.get('/create-product', function(req, res, next) {
	res.render('admin-create');
});

// POST /admin/create-product
router.post('/create-product', upload.single('product_picture'), function(req, res, next) {
	// Ajouter un produit dans la table 'products'
	if (req.file.size < (3*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpg') ) {
		fs.rename(req.file.path,'public/images/'+req.file.originalname);
	} else {
		res.send('Vous avez fait une erreur dans le téléchargement')
	}
  console.log(req.file.originalname);
	connection.query('insert into products values(null, ?, ?, ?);',[req.body.product_name,req.body.product_description,req.file.originalname], function (error, results, fields) {
	  if (error) throw error;
		res.redirect('/admin');
	  //console.log(results);
	});

	console.log(req.body);

});

// req.params -> /monlien-:id
// req.body -> POST
// req.query -> monlien?id=1

// GET /admin/delete-product
router.get('/delete-product', function(req, res, next) {
	// Supprimer le produit en recupérant l'id dans la query
	//delete from products where id=
	connection.query('delete from products where id=?',[req.query.id],function (error, results, fields) {
	  if (error) throw error;
		res.redirect('/admin');
	  //console.log(results);
	});
});


module.exports = router;
