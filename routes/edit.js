var express = require('express');
var router = express.Router();

const mysql = require('mysql');

const config = require('../config.js');

const connection = mysql.createConnection(config);

connection.connect();

// GET /edit/create-product
router.get('/', function(req, res, next) {
	res.render('edit');
});

router.post('/modifproduit', function(req, res, next) {
	let newtext = req.query.newtext;
	console.log(newtext);
	connection.query('UPDATE products SET description = ? where id=5',[newtext],function (error, results, fields) {
		if (error) throw error;
		res.redirect('/edit');
	});
});
module.exports = router;
