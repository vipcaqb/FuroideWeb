var express = require('express');
var router = express.Router();
var verifyToken = require("../verifyToken");

var News = require('../../models/news');

//Manage news list
router.get('/',verifyToken.checkToken,verifyToken.protectRoute,async (req,res) =>{
    var maxNews = 7;
    try {
        var items = await News.find().limit(maxNews).sort({date : -1});
    } catch (error) {
        res.send({msg : error});
    }
    res.locals.maxNews = maxNews;
    res.render('admin/news.ejs',{data : items});
});

//Get create news view
router.get('/create',verifyToken.checkToken,verifyToken.protectRoute,async(req,res) =>{
    res.render('admin/add-news-view.ejs')
})

//Post a news
router.post('/create',verifyToken.checkToken,verifyToken.protectRoute, async (req,res)=>{
    try {
        var item = new News({
            vi_title : req.body.vi_title,
            jp_title : req.body.jp_title,
            vi_content : req.body.vi_content,
            jp_content : req.body.jp_content,
            author : req.cookies.fullname,
            date : Date.now()
        });
        var saveItem = await item.save();
        res.redirect('/admin/news');
    } catch (error) {
        res.send({message: error});
    }
});

//Get edit view
router.get('/edit/:id',verifyToken.checkToken,verifyToken.protectRoute, async (req,res) =>{
    try {
        var item = await News.findById(req.params.id);
    } catch (error) {
        res.json({message : error});
    }
    res.render('admin/edit-one-news.ejs',{data : item});
});

//Edit a news
router.post('/edit/:id',verifyToken.checkToken,verifyToken.protectRoute, async (req,res) =>{
    try {
        var updateItem = await News.findByIdAndUpdate(req.params.id, {
            $set: {
                vi_title : req.body.vi_title,
                jp_title : req.body.jp_title,
                vi_content : req.body.vi_content,
                jp_content : req.body.jp_content,
            }
        });
        res.redirect('/admin/news');
    } catch (error) {
        res.send({message: error});
    }
});

//Delete a news
router.post('/delete/:id',verifyToken.checkToken,verifyToken.protectRoute, async (req,res) =>{
    try {
        var deleteItem = await News.findByIdAndDelete(req.params.id);
    } catch (error) {
        res.send({message: error});
    }
    res.redirect('back');
});
module.exports = router;