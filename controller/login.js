//importing bcryptjs
const bcryptjs = require("bcryptjs");

//importing model
const restaurantModel = require("../model/restaurant");
const customerModel = require('../model/customer');

//importing custom response function
const { sendResponse } = require("../include/inc_func");



//importing jsonwebtoken
const jwt = require("jsonwebtoken");


// Signin function
function signIn(req, res) {
    let userData = req.body;

    let baseUrl = req.baseUrl;

    function setModel(){
        return baseUrl==='/customer'?customerModel:restaurantModel;
    }

    setModel().findOne({ email: userData.email })
    .then((user) => {
        if (user !== undefined || user !== null) {
            bcryptjs.compare(userData.password, user.password, (err, result) => {
                if (!err) {
                    if (result === true) {
                        jwt.sign({ email: user.email }, "secretKey", { expiresIn: "1d" },
                            (err, token) => {
                                if (!err) {
                                    res.send({ status: 200, message: "signin successful", success: true ,token:token,user});
                                    
                                } else {
                                    sendResponse(400,"some error generating token",false,res)
                                }
                            }
                        );
                    } else {
                        sendResponse(401,"password incorrect, please try agian",false,res);
                    }
                } else {
                    sendResponse(400,"some issue, please try again",false,res);
                }
            });
        } else {
            sendResponse(400," some internal error try again",false,res);
        }
    })
    .catch((error) => {
        sendResponse(404,"user doesnot exist, please signup",false,res);            
    });
}

module.exports = {signIn}