const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);

//connect to database
mongoose.connect('mongodb+srv://Admin:Admin@cluster0.gtqis.mongodb.net/Bulletin-App?retryWrites=true&w=majority', {useNewUrlParser: true,
     useUnifiedTopology: true }, (err) => {
    if (!err) 
    { console.log('MongoDB connection succeeded.'); }
    else 
    { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2))}
});

module.exports = mongoose;
require('./user.model');