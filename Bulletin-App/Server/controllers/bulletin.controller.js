const express = require('express');
var router = express.Router();

var { Bulletin } = require('../models/bulletin.model');

//link = localhost:3000/bulletin/
router.get('/', (req, res) => {
    Bulletin.find((error, docs) => {
        if (!error) 
        { res.send(docs); }
        else
        { console.log('Error in retrieving bulletin :' + JSON.stringify(err, undefined, 2)); }
    });
});

//save bulletin post
router.post('/', (req, res) => {
    var bull = new Bulletin({
        post: req.body.post
    });
    bull.save((error, doc)=> {
        if (!error) 
        { res.send(doc); }
        else
        { console.log('Error in bulletin save : ' + JSON.stringify(err, undefined, 2)); }
    });
});

//delete bulletin post
router.delete('/', (req, res) => {
    if (!error) {
        res.send(doc);
    }
    else {
        console.log('Error in bulletin delete.' + JSON.stringify(error, undefined, 2));
    }
})

module.exports = router;