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
		console.log(results);
		res.render('admin-index',{products:results});
	});
});

router.get('/section', function(req, res, next) {
	connection.query('SELECT * FROM sections;', function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.render('admin-index-section',{sections:results});
	});
});

// GET /admin/create-product
router.get('/create-product', function(req, res, next) {
	res.render('admin-create',{message:'',body:{product_name:'',ingredients:'',category:'',product_description:''},product_picture:''});
});

// POST /admin/create-product
router.post('/create-product', upload.single('product_picture'), function(req, res, next) {
	console.log(req.body);
	console.log(req.file);
	if (req.body.product_name.length > 55 || req.body.ingredients.length > 255 || req.body.category.length > 255 ||	req.body.product_description.length > 255){
		res.render('admin-create',{message:'Attention, les textes sont trop longs :', body:req.body});
	};
	if (req.file) {
		if (req.file.originalname.length < 241){
			if(req.file.size < (3*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg')) {
				console.log('insertion');
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
				res.render('admin-create',{message:'Attention, image de type png ou jpeg requis, 3Mo de poids maximum', body:req.body});
			}
		} else {
			res.render('admin-create',{message:'Attention, nom de fichier trop long', body:req.body});
		}
	} else {
		res.render('admin-create',{message:'Attention, une image est requise :', body:req.body});
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
		console.log(results);
		res.render('admin-modify', {product:results[0]});
		//console.log(results);
	});
});

router.post('/modify', upload.single('product_picture'), function(req, res){
	console.log(req.file);
	console.log(req.body);
	if (req.body.product_name.length > 55 || req.body.ingredients.length > 255 ||	req.body.category.length > 255 ||	req.body.product_description.length > 255){
		res.render('admin-create',{message:'Attention, les textes sont trop longs :', body:req.body});
	}
	if (req.file){
		if (req.file.originalname.length < 241 && req.file.size < (3*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg')) {
			fs.rename(req.file.path,'public/images/'+req.file.originalname);
		} else {
			// La longueur du nom de fichier est aussi testée, mais le message n'en parle pas. Je trouve ca trop technique et le cas est rare
			res.render('admin-create',{message:'Attention, image de type png ou jpeg requis, 3Mo de poids maximum', body:req.body});
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

// GET /admin/modify-product
router.get('/modify-section', function(req, res, next) {
	connection.query('SELECT * FROM sections WHERE id=?',[req.query.id], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		res.render('admin-modify-sections', {section:results[0]});
		//console.log(results);
	});
});

router.post('/modify-section', upload.single('section_picture'), function(req, res){
	console.log(req.file);
	console.log(req.body);
	if (req.body.section_name.length > 150 || req.body.paragraph.length > 2500){
		res.render('admin-modify-sections',{message:'Attention, les textes sont trop longs :', section:req.body});
	}
	if (req.file){
		if (req.file.originalname.length < 241 && req.file.size < (3*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg')) {
			fs.rename(req.file.path,'public/images/'+req.file.originalname);
		} else {
			// La longueur du nom de fichier est aussi testée, mais le message n'en parle pas. Je trouve ca trop technique et le cas est rare
			res.render('admin-modify-sections',{message:'Attention, image de type png ou jpeg requis, 3Mo de poids maximum', section:req.body});
		}
		connection.query('UPDATE sections SET picture = ? WHERE id = ?',
		[req.file.originalname, req.query.idSection],
		function(error){
			if (error) {
				console.log(error);
			}
		});
	}

	connection.query('UPDATE sections SET title = ?, text = ? WHERE id = ?',
	[req.body.section_name, req.body.paragraph, req.query.idSection],
	function(error){
		if (error) {
			console.log(error);
		}
	});
	res.redirect('/admin/section');
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
