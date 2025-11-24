const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true, unique : true},
    password : {type : String , required : true},
    role : {type : String, enum : ['customer', 'admin'], default : 'customer'},
    address : {type : String}
},
{timestamps : true}
);

// we will a pre-save hook to check wheether the password is modified or not
// this acts as a middleware before saving the user
userSchema.pre('save', async function(next){
    //we did not use the arrow function because we want to use 'this' keyword
    if(!this.isModified('password'))
    {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next ();

});

// method to match the password
userSchema.methods.matchPassword = async function (entered){
    return await bcrypt.compare(entered , this.password);
};

// create the model
const User = mongoose.model('User' , userSchema);
module.exports = User;