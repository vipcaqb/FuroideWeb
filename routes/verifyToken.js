const jwt = require('jsonwebtoken');

var checkToken = (req, res, next) =>{
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('access denied');
    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user =  verify;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

var protectRoute = (req, res, next) =>{
     if(req.user) {        
        return next();
    } 
    res.status(401).send('Unauthorized');
}

module.exports = {checkToken , protectRoute}