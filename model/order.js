//importing mongoose
const mongoose=require ("mongoose");

//schema creation
const orderSchema=mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
    },
    products:[        
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
            },
            orderedQuantity:{
                type: Number,
            },
        }
    ],
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants',
    },
    paymentInfo : {
        type: String,
        default: ''
    },
    status:{
        type: Number,
        default: 0
    },
    
    
},{timestamps:true})




//setting up model
const orderModel=mongoose.model("order",orderSchema);



//exporting model
module.exports = orderModel;