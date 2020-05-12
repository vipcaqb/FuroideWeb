const mongoose = require('mongoose');

const NewSchema = mongoose.Schema({
    vi_title: {
        type: String
    },
    jp_title: {
        type: String
    },
    vi_content: {
        type: String
    },
    jp_content:{
        type: String
    },
    author: {
        type: String
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model('news', NewSchema);