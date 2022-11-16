var env = process.env.NODE_ENV || 'development'; //check the environment

//fetch env.config
var config = require('./config.json');
var envConfig = config[env];
//add env. config values to process
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);