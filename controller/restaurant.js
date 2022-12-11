//importing bcryptjs
const bcryptjs = require("bcryptjs");

//importing model
const restaurantModel = require("../model/restaurant");

//importing custom response function
const { sendResponse, getAll, getSingle } = require("../include/inc_func");
const orderModel = require("../model/order");


//fetch all restaurants
function fetchAll(req, res) {

    getAll(restaurantModel, res);
    
}

//fetch single customer
function fetchSingle(req, res) {
    
    let id = req.params.id
    getSingle(restaurantModel, id, res);
    
}

//  update user function
function update(req, res) {

    let id = req.params.id;
    let newData = req.body;
  
    delete newData.password;
    restaurantModel.findByIdAndUpdate(id, newData, (err, doc) => {
      if (!err) {
          sendResponse(200,"data updated",true,res)
      } else {
          sendResponse(400,"some error, please try again",true,res)
          console.log(err)
      }
    })
  
}

//get single user order
function fetchSingleUserOrder(req, res) {
    
    let id = req.params.id
    orderModel.find({restaurant:id}).populate({path: 'products',populate: { path: 'product'}})
    .then((data)=>{
        res.status(200).send({success:true,message:'hi', data})
    })
    .catch((error)=>{
        res.status(404).send({success:false, message:"data not found"}) 
    })
    
}

function updateOrder(req, res) {
    
    let id = req.params.id;
    let val = req.body;
    // console.log(id)
    orderModel.findByIdAndUpdate(id, val).populate({path: 'products',populate: { path: 'product'}})
    .then((data)=>{
        res.status(200).send({success:true,message:'hi', data})
    })
    .catch((error)=>{
        res.status(404).send({success:false, message:"data not found"}) 
    })
    
}

// Resetpassword function
function findUserByEmail(req, res) {       //fetching single user through email 

    let userEmail = req.body;

    restaurantModel.findOne({ email: userEmail.email })
    .then((user) => {
        // sendResponse(200,"user found",true,res)
        res.send({status:200, msg:"user found", success:true, user:user})
    })
    .catch((err) => {
        sendResponse(404,"user not found",false,res)
        console.log(err)
    })

}
  
  /*  Admin will send a link after getting email 
      and provide with a reset passlink in their registered email  */
   
//change password function
function resetPassword(req, res) {

    let id = req.params.id;
    let newpass = req.body;
    
    bcryptjs.genSalt(10, (err, salt) => {
        if (!err) {
            bcryptjs.hash(newpass.password, salt, (err, encryptedpassword) => {
                if (!err) {
    
                    newpass.password = encryptedpassword;
    
                    customerModel.findByIdAndUpdate(id, { password: newpass.password })
                    .then((user) => {
                        sendResponse(200,"user password updated",true,res)
                    })
                    .catch((err) => {
                        sendResponse(400,"some error, please try again",true,res)
                        console.log(err)
                    })
                } else {
                    sendResponse(400,"some error, please try again",true,res)
                    console.log(err)
                }
            })
        } else {
            sendResponse(400,"some error, please try again",true,res)
            console.log(err)
        }
    })
}
   
//exporting custom functions
module.exports = 
{ 
    fetchAll,
    fetchSingle,
    update,
    findUserByEmail,
    resetPassword,
    fetchSingleUserOrder,
    updateOrder,
};