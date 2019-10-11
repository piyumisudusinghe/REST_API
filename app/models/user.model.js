const mongoose = require('mongoose');

//define the schema for the User entity
const UserSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    birthday:String
},{
    timestamps:true
});

module.exports = mongoose.model('User', UserSchema);