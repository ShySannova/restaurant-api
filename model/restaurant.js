//importing mongoose
const mongoose=require ("mongoose");

//schema creation
const restaurantSchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:Object,
    },
    timing:{
        type:{open:Number,closed:Number}
    },
    img:{
        type:String,
    },
    tags:{
        type:String
    },
    active:{
        type:Boolean,
        default:false
    },
    refreshToken:{
        type:String,
        default:''
    }


},{timestamps:true})

//setting up model
const restaurantModel=mongoose.model("restaurants",restaurantSchema);


//exporting model
module.exports=restaurantModel;