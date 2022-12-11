//importing mongoose
const mongoose=require ("mongoose");

//schema creation
const cartSchema=mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    orderedQuantity:{
        type: Number,
    },

    
    
},{timestamps:true})




//setting up model
const cartModel=mongoose.model("carts",cartSchema);



//exporting model
module.exports = cartModel;