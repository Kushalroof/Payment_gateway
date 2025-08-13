const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}));


const stripe = require("stripe")(process.env.STRIPE_KEY);

app.post("/checkout", async(req,res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            mode : "payment",
            line_items: req.body.items.map(item =>{
                return{
                    price_data:{
                        currency: "inr",
                        product_data:{
                            name:item.name
                        },
                        unit_amount:(item.price)*100,
                    },
                    quantity: item.quantity
                }
            }),
            success_url:"http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        })

        res.json({url:session.url})
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

app.listen(8000,()=>{
    console.log("Server is listening");
});