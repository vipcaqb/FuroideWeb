var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/',async (req,res)=> {
  res.send('This is user page');
});

// Register an user
router.post('/register', async (req,res)=>{
  try {
    var {fullname, username, password} = req.body;
    User.findOne({username : username}).then(user =>{
      if(user){
        res.send({message : "username is exist"});
      }
      else {
        var newUser = new User({
          fullname : fullname,
          username : username,
          password : password
        });
        //hash password
        bcrypt.genSalt(10, (err,salt) =>{
          bcrypt.hash(newUser.password,salt,(err,hash) =>{
            if(err) throw(err);
            newUser.password = hash;
            newUser.save().then(
              () =>{
                res.send(newUser);
              }
            );
          })
        });
      }
    })
  } catch (error) {
    res.send({message : error});
  }
});

module.exports = router;
