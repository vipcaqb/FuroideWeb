var express = require('express');
var router = express.Router();
var verifyToken = require('../verifyToken');
var express = require('express');

app = express();

var newsRouter = require('./news');
var informationRouter = require('./information');
var mailboxRouter = require('./mailbox');
var serviceRouter = require('./service');

app.use(express.urlencoded({ extended: false }));

//Load home admin page
router.get('/',verifyToken.checkToken,verifyToken.protectRoute,(req,res) =>{
    res.render('admin/index.ejs');
});


router.use('/news',verifyToken.checkToken,verifyToken.protectRoute,newsRouter);
router.use('/information',verifyToken.checkToken,verifyToken.protectRoute, informationRouter);
router.use('/service',verifyToken.checkToken,verifyToken.protectRoute, serviceRouter);
router.use('/mailbox',verifyToken.checkToken,verifyToken.protectRoute, mailboxRouter);

module.exports = router;