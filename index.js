// importing express
const express  = require("express");

//importing mongoose
const mongoose = require("mongoose");

//importing cors
const cors     = require("cors");

//importing env
const env = require("dotenv").config();

//setting port variable & other variables
let PORT= process.env.PORT || process.env.DEV_PORT;
const CLI_DOMAIN = process.env.CLI_DOMAIN;
const URI = process.env.URI;

const stripe = require("stripe")(process.env.STRIPE_KEY);

//setting app variable
const app = express();


// middleware for cors
app.use(cors());


//middleware to get parsed json
app.use(express.json());
app.use(express.static('public')); 




//importing custom routers
const customerRouter = require("./routes/customer");
const restaurantRouter = require("./routes/restaurant");
const productRouter = require("./routes/product");
const orderModel = require("./model/order");

// setting endpoints
app.use("/customer",[customerRouter]);
app.use("/restaurant",[restaurantRouter]);
app.use("/product",[productRouter]);


app.post('/create-checkout-session', async (req, res) => {

    try{
        let orderId = req.body;
    
        const order = await orderModel.findById(orderId.id).populate({path: 'products',populate: { path: 'product' }})
        // console.log(order)

        const lineitems = await Promise.all(
            
            order?.products?.map((list)=>{
              
               return{
                       price_data: {
                         currency: "inr",
                         product_data: {
                           name: list?.product.name,
                         },
                         unit_amount: Math.round(list?.product.price * 100),
                       },
                       quantity: list?.orderedQuantity
                       
                     }
            })
        )

        //  console.log(lineitems)

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            success_url: `${CLI_DOMAIN}?success=true`,
            cancel_url: `${CLI_DOMAIN}?canceled=true`,
            line_items: lineitems,
            shipping_address_collection: {allowed_countries: ['US', 'IN']},
            payment_method_types: ["card"],
            
        });

        const orderUpdate = await orderModel.findByIdAndUpdate(orderId.id, {paymentInfo:session.id, status:3})


        res.json({stripeSession: session})
    }catch(err){
        console.log(err)
    }

});


//setting Database connection
// mongoose.connect("mongodb://127.0.0.1:27017/food_order")
// .then(()=>{
//     console.log("Database Connection Successful");
// })
mongoose.connect(`${URI}`)
.then(()=>{
    console.log("Database Connection Successful");
})
.catch((err)=>{
    console.log(err);
})

//starting server
app.listen(PORT,()=>{
    console.log(`server is up and running on port ${PORT}`);
})