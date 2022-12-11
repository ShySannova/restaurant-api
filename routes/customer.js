//importing express
const express = require("express");

//setting router
const router = express.Router();

// Controller Imports
const { 
    fetchAll,
    fetchSingle,
    findUserByEmail,
    resetPassword,
    update,
    createCart,
    getOrders,
    createOrder,
    fetchSingleUserOrder,
    deleteCart,
    getCart} = require("../controller/customer"); 

const { signUp } = require('../controller/registration')
const { signIn } = require('../controller/login')




// endpoint path with controller function
router.post('/signin',signIn);
router.post('/signup',signUp);
router.post('/cart',createCart);
router.post('/order',createOrder);
router.get('/all',fetchAll);
router.get('/cart/:id',getCart)
router.get('/orders',getOrders);
router.get('/orders/:id',fetchSingleUserOrder);
router.get('/:id',fetchSingle);
router.patch('/:id',update);
router.post('/resetpassword/:id',resetPassword);
router.get('/finduserbyemail', findUserByEmail);
router.delete('/cart/deleteAll/:id',deleteCart)


//exporting router
module.exports = router;


