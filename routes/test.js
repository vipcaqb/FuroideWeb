var express = require('express');
var router = express.Router();

//Get news list
router.get('/',(req,res) =>{
    res.render('./shared/header');
});

module.exports = router;