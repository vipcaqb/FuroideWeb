const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullname : {
        type: String,
        require : true
    },
    username: {
        type: String,
        require : true
    },
    password : {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('user', UserSchema);