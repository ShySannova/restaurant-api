//importing bcryptjs
const bcryptjs = require("bcryptjs");

//importing model
const customerModel = require("../model/customer");
const cartModel = require("../model/cart");


//importing jsonwebtoken
const jwt = require("jsonwebtoken");

//importing custom response function
const { sendResponse, getAll, getSingle, create, removeData } = require("../include/inc_func");
const orderModel = require("../model/order");


//fetch all customers
function fetchAll(req, res) {

    getAll(customerModel, res);
    
}

//fetch single customer
function fetchSingle(req, res) {
    
    let id = req.params.id
    getSingle(customerModel, id, res);
    
}

//get single user order
function fetchSingleUserOrder(req, res) {
    
    let id = req.params.id
    orderModel.find({user:id}).populate({path: 'products',populate: { path: 'product' }})
    .then((data)=>{
        res.status(200).send({success:true, data})
    })
    .catch((error)=>{
        res.status(404).send({success:false, message:"data not found"}) 
    })
    
}

//add product to cart
function createCart(req, res){
    let data = req.body
    // console.log(data)
    create(cartModel,data, res);
}

//delete all from cart of particular user
function deleteCart(req, res){
    let id = req.params.id
    cartModel.deleteMany({user:id})
    .then((data)=>{
        res.send({statusCode:200,message:`Delete sucessfully on this _id ${id} `,status:true});
    })
    .catch((err)=>{
        res.send({statusCode:404,message:"user not found",status:false,err});

    })
}

// read data from cart of user
function getCart(req,res){
    let id =req.params.id;
    cartModel.find({user:id}).populate({path:'product',populate:{path:'restaurant'}})
    .then((data)=>{
      res.status(200).send({success:true, data})
    })
    .catch((error)=>{
      res.status(404).send({success:false, message:"data not found"})
    })
}

//create order
function createOrder(req, res){
    let data = req.body
    // console.log(data)
    create(orderModel,data, res);
}

//get order of user
function getOrders(req,res){
    orderModel.find().populate({path: 'products',populate: { path: 'product' }})
    .then((data)=>{
      res.status(200).send({success:true, data})
    })
    .catch((error)=>{
      res.status(404).send({success:false, message:"data not found"})
    })
}


//  update user function
function update(req, res) {

    let id = req.params.id;
    let newData = req.body;
  
    delete newData.password;
    customerModel.findByIdAndUpdate(id, newData, (err, doc) => {
      if (!err) {
          sendResponse(200,"data updated",true,res)
      } else {
          sendResponse(400,"some error, please try again",true,res)
          console.log(err)
      }
    })
  
}

// Resetpassword function
function findUserByEmail(req, res) {       //fetching single user through email 

    let userEmail = req.body;
  
    customerModel.findOne({ email: userEmail.email })
      .then((user) => {
        sendResponse(200,"user found",true,res)
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
    createCart,
    getOrders,
    createOrder,
    fetchSingleUserOrder,
    deleteCart,
    getCart,
};