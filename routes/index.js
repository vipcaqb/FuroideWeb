var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.lang == undefined) {
    res.cookie('lang','vi',{maxAge:900000});
    res.redirect('/');
  }
  res.render('index');
});

router.use('/change-lang/:lang', (req,res) =>{
  res.cookie('lang',req.params.lang, {maxAge:900000});
  res.redirect('back');
});
module.exports = router;