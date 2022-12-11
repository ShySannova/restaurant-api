// importing express
const express = require("express");

//setting router 
const router = express.Router();

// Controller Imports
const { 
    fetchAll,
    fetchSingle,
    update,
    findUserByEmail,
    resetPassword,
    fetchSingleUserOrder,
    updateOrder} = require("../controller/restaurant");

const { signUp } = require('../controller/registration')
const { signIn } = require('../controller/login')



// endpoint path with controller function
router.post('/signup',signUp);
router.post('/signin',signIn);
router.post('/email', findUserByEmail);
router.get('/all',fetchAll);
router.get('/orders/:id',fetchSingleUserOrder)
router.get('/:id',fetchSingle);
router.patch('/order/:id',updateOrder)
router.patch('/:id',update);
router.patch('/resetpassword/:id',resetPassword);



//exporting router
module.exports = router;



