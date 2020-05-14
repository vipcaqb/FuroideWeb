var express = require('express');
var router = express.Router();
var News = require('../models/news');
var verifyToken = require('../routes/verifyToken');

//Get news list
router.get('/',async (req,res) =>{
    try {
        var items = await News.find().limit(10);
        console.log('Ok');
    } catch (error) {
        console.log("Error");
    }
    res.locals.lang = req.cookies.lang;
    res.render("news",{data : items});
});

//Get a news
router.get('/:id',async (req,res) =>{
    try {
        var item = await News.findById(req.params.id);
    } catch (error) {
        res.send({message: error});
    }
    res.send(item);
});

//Post a news
router.post('/',verifyToken.checkToken,verifyToken.protectRoute, async (req,res)=>{
    try {
        var item = new News({
            vi_title : req.body.vi_title,
            jp_title : req.body.jp_title,
            vi_content : req.body.vi_content,
            jp_content : req.body.jp_content,
            author : "admin",
            date : Date.now()
        });
        var saveItem = await item.save();
        res.send(item);
    } catch (error) {
        res.send({message: error});
    }
});

//Update a news
router.put('/:id',verifyToken.checkToken,verifyToken.protectRoute, async (req,res) =>{
    try {
        var updateItem = await News.findByIdAndUpdate(req.params.id, {
            $set: {
                vi_title : req.body.vi_title,
                jp_title : req.body.jp_title,
                vi_content : req.body.vi_content,
                jp_content : req.body.jp_content,
            }
        });
        res.send("Update successfully");
    } catch (error) {
        res.send({message: error});
    }
});

//Delete a news
router.delete(':id',verifyToken.checkToken,verifyToken.protectRoute, async (req,res) =>{
    try {
        var deleteItem = await News.findByIdAndDelete(req.body.id);
        res.send("Xoa thanh cong");
    } catch (error) {
        res.send({message: error});
    }
});
module.exports = router;