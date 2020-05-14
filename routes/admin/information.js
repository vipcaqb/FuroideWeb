var express = require('express');
var router = express.Router();

router.get('/',async (req,res) =>{
    res.render('admin/information');
});

module.exports = router;