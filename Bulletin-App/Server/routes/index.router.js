const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

const csrf = require('csurf'); 
const csrfProtection = csrf();
router.use(csrfProtection); //all routes will be protected by csrfProtection

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.get('/user/sign-up', function(req, res, next){
    res.render('/user/sign-up', {csrfToken: req.csrfToken()});
});

module.exports = router;
