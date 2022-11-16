const mongoose = require('mongoose');

//model for bulletin 
var Bulletin = mongoose.model('Bulletin', {
    post: {type: String}
});

module.exports = { Bulletin };