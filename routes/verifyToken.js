const jwt = require('jsonwebtoken');

var checkToken = (req, res, next) =>{
    try {
        const token = req.cookies.Authorization;
        // Xác thực token
        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if(payload) {
                req.user = payload;
                next();
            } else {
                // Nếu token tồn tại nhưng không hợp lệ, server sẽ response status code 401 với msg bên dưới
                return res.redirect("/login");
            }
        })
    } catch(err) {
        // Nếu không có token ở header, server sẽ response status code 401 với msg bên dưới        
        res.status(401).send('No token provided');
    }    
}

var protectRoute = (req, res, next) =>{
     if(req.user) {        
        return next();
    } 
    res.status(401).send('Unauthorized in protectRoute');
}

module.exports = {checkToken , protectRoute}