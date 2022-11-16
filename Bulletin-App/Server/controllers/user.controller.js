const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

//save user details
module.exports.register = (req, res, next) => {
    var user = new User();
    user.JobRole = req.body.JobRole;
    user.FirstName = req.body.FirstName;
    user.LastName = req.body.LastName;
    user.email = req.body.email;
    user.password = req.body.password;
    csrfToken = req.csrfToken(); //assign csrf token 
    user.save((error, doc) => {
        if (!error)
        res.send(doc);
        else
        {
            if(error.code = 11000)
            res.status(422).send(['Duplicate email address found.']); //custom validation message
            else
            return next(error);
        }
    });
}

module.exports.authenticate = (req, res, next) =>{
    //call passport authentication
    passport.authenticate('local', (error, user, info) => {
        //error from passport middleware
        if (error) 
        return res.status(400).json(error);
        //if registered user
        else if (user) 
        return res.status(200).json({"token": user.generateJwt()});
        //unknown user or wrong password
        else
        return res.status(404).json(info);
    })
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({_id: req._id},
        (err, user) => {
            if (!user)
            return res.status(404).json({status:false, message: 'User not found.'});
            else
            return res.status(200).json({status:true, user: _.pick(user,['FirstName', 'email'])
        });
        })
}