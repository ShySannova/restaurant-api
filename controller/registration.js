//importing bcryptjs
const bcryptjs = require("bcryptjs");

//importing model
const restaurantModel = require("../model/restaurant");
const customerModel = require('../model/customer');

//importing custom response function
const { sendResponse } = require("../include/inc_func");




//Signup function
function signUp(req, res) {

    let userData = req.body;
    let baseUrl = req.baseUrl;

    function setModel(){
        return baseUrl==='/customer'?customerModel:restaurantModel;
    }


    bcryptjs.genSalt(10, (err, salt) => {
        if (!err) {
            bcryptjs.hash(userData.password, salt, (err, encryptedpassword) => {
                if (!err) {
                    userData.password = encryptedpassword
                    
                    setModel().create(userData)
                    .then((doc) => {
                        sendResponse(200,"Data Created Successfully",true,res)
                    })

                    .catch((err) => {
                        sendResponse(500,"some error try again",false,res)
                        console.log(err);
                    })
                } else {
                    sendResponse(500,"some error try again",false,res)
                    console.log(err)
                }
            })
        } else {
           sendResponse(500,"some error try again",false,res)
           console.log(err)
        }
    })

}



module.exports = {signUp}