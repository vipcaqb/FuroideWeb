var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', async (req,res) =>{
    try {
        var token = req.cookies.Authorization;
        res.cookie("Authorization","",{maxAge : 0});
    } catch (error) {
        res.send({msg: error});
    }
    res.redirect('/login');
});

module.exports = router;