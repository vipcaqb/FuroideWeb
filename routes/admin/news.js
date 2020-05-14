var express = require('express');
var router = express.Router();

router.use('/',async (req,res) =>{
    res.send('Đây là phần quản lý tin tức');
});

module.exports = router;