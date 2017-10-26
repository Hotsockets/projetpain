var express = require('express');
var router = express.Router();

router.get('/:myfilename', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('/'+req.params.myfilename);
});

module.exports = router;
