const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
//this action generates a username and password fields, checks that the username is unique,
// it hashes the password, generates salt and saves it to the db
userSchema.plugin(passportLocalMongoose);
module.exports= mongoose.model('User',userSchema);