const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken'); //JWT

var userSchema = new mongoose.Schema({
    JobRole: {
        type: String,
        required: 'JobRole can\'t be empty.'
    },
    FirstName: {
        type: String,
        required: 'First name can\'t be empty.'
    },
    LastName: {
        type: String,
        required: 'Last name can\'t be empty.'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [7, 'Password is to short.']
    },
    saltSecret: String //used for encryption
});

//Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalild e-mail.');


//Events
//generate random salt hash
userSchema.pre('save', function (next){
    bcrypt.genSalt(10, (err, salt) => {
        becrypt.hash(this.password, salt, (err, hash) =>{
            this.password = hash;
            this.saltSecret = salt;
            next();  
        });       
    });
});

//methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJwt = function (){
    return Jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('User', userSchema);
