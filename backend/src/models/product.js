const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    name : {type : String , required : true},
    description : String,
    price : {type : Number , required  :true},
    stock : {type : Number ,  default : 0},
    category : String , 
    images : [String],
    createdBy : {type : mongoose.Schema.Types.ObjectId , ref : 'user'}

},
{timestamps : true}
);

module.exports = mongoose.model('Product', productSchema);
