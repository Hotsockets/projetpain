const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer  = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'tmp/' });
const config = require('../config.js');

const connection = mysql.createConnection(config);

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
	console.log(req.body);
	if (req.file.size < (3*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg')) {
		fs.rename(req.file.path,'public/images/'+req.file.originalname);
		// Ajouter un produit dans la table 'products'
		connection.query('insert into products values(null, ?, ?, ?, ?, ?);',
		[req.body.product_name, req.body.product_description, req.body.ingredients, req.file.originalname, req.body.category],
		function (error, results, fields) {
			if (error) throw error;
			res.redirect('/admin');
			//console.log(results);
		});
	} else {
		res.send('Vous avez fait une erreur dans le téléchargement')
	}
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

// GET /admin/modify-product
router.get('/modify', function(req, res, next) {
	connection.query('SELECT * FROM products WHERE id=?',[req.query.id], function (error, results, fields) {
		if (error) throw error;
		//console.log(results);
		res.render('admin-modify', {product:results[0]});
		//console.log(results);
	});
});

router.post('/modify', upload.single('product_picture'), function(req, res){
	console.log(req.file);
	console.log(req.body.product_picture);
	if (req.file){
		console.log(req.body.product_picture);
		if (req.file.size < (3*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg')) {
			fs.rename(req.file.path,'public/images/'+req.file.originalname);
		} else {
			res.send('Vous avez fait une erreur dans le téléchargement')
		}
		connection.query('UPDATE products SET picture = ? WHERE id = ?',
		[req.file.originalname, req.query.idProduit],
		function(error){
			if (error) {
				console.log(error);
			}
		});
	}

	connection.query('UPDATE products SET name = ?, description = ?, ingredients = ?, category = ? WHERE id = ?',
	[req.body.product_name, req.body.product_description, req.body.ingredients, req.body.category, req.query.idProduit],
	function(error){
		if (error) {
			console.log(error);
		}
	});
	res.redirect('/admin');
});


//
// router.post('/update/:idArticle(\\d+)', function(req, res){
// 	connection.query('UPDATE posts SET title = ?, text = ? WHERE id = ?',
// [req.body.title, req.body.text, req.params.idArticle], function(error){
// 		if (error) {
// 			console.log(error);
// 		} else {
// 			res.redirect('/admin');
// 		}
// 	})
// });

module.exports = router;
