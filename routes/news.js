var express = require('express');
var router = express.Router();
var News = require('../models/news');

//Get news list
router.get('/',async (req,res) =>{
    try {
        var items = await News.find().limit(10).sort({date: -1});
        console.log('Ok');
    } catch (error) {
        console.log("Error");
    }
    if(req.cookies.lang == undefined) {
        res.cookie('lang','vi',{maxAge:900000});
        res.redirect('/');
      }
    res.locals.lang = req.cookies.lang;
    res.render("news",{data : items});
});

//Get a news
router.get('/:id',async (req,res) =>{
    try {
        var item = await News.findById(req.params.id);
        var items = await News.find().limit(5);
    } catch (error) {
        res.send({message: error});
    }
    if(req.cookies.lang == undefined) {
        res.cookie('lang','vi',{maxAge:900000});
        res.redirect('/');
      }
    res.locals.post = item;
    res.locals.lang = req.cookies.lang;
    res.render('news-read.ejs',{posts : items});
});


module.exports = router;