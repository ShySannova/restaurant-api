//importing mongoose
const mongoose=require ("mongoose");

//schema creation
const productSchema=mongoose.Schema({

    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
    },
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    desc: {
        type: String,
        required: true,
        maxlength: 500,
    },
    img: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1
    },
    available: {
        type: Boolean,
        default:false,
    }
    
    
},{timestamps:true})




//setting up model
const productModel=mongoose.model("products",productSchema);



//exporting model
module.exports = productModel;