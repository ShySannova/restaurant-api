//importing mongoose
const mongoose=require ("mongoose");

//schema creation
const customerSchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        enum:["male","female","other"],
    },
    contact:{
        type:Number,
        required:true,
        unique:true,
        minLenght:10,
        maxLenght:10,
    },
    password:{
        type:String,
        required:true,
    },
    Addresses:{
        type:Object,
       
    },
    profile_pic:{
        type:String,
        default:"",  
    },
    active:{
        type:Boolean,
        default:true,
    },
    refreshToken:{
        type:String,
        default:''
    }


},{timestamps:true})


//setting up model
const customerModel=mongoose.model("customers",customerSchema);



//exporting model
module.exports=customerModel;