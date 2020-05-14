var express = require('express');
var router = express.Router();

var News = require('../../models/news');

router.get('/',async (req,res) =>{
    var maxNews = 7;
    try {
        var items = await News.find().limit(maxNews);
    } catch (error) {
        res.send({msg : error});
    }
    res.locals.maxNews = maxNews;
    res.render('admin/news.ejs',{data : items});
});

module.exports = router;