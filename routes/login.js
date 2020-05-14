var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Get login page
router.get('/', (req,res) =>{
    res.render('login.ejs');
});

router.post('/',async (req,res) =>{
    var user = await User.findOne({username : req.body.username});
    if(!user){
        return res.send("Ten dang nhap khong ton tai");
    }

    //if password is incorrect
    var validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) {
        return res.send('Sai mat khau');
    }
    
    // Create And  assign token
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
    res.cookie('Authorization',token,{maxAge : "999999"});
    return res.redirect("/admin");
});



module.exports = router;