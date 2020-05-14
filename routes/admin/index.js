var express = require('express');
var router = express.Router();
var verifyToken = require('../verifyToken');

var newsRouter = require('./news');

//Load home admin page
router.get('/',verifyToken.checkToken,verifyToken.protectRoute,(req,res) =>{
    res.render('admin/index.ejs');
});


router.use('/news',newsRouter);

module.exports = router;