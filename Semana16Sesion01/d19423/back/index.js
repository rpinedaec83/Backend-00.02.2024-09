const cors = require('cors');
const express = require('express');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send("Hola desde el back");
})
app.post("/api/create-checkout-session",async (req,res)=>{
    const {product} = req.body;
    console.log(req.body)
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:[
            {
                price_data: {
                    currency: "pen",
                    product_data: {
                        name: product.name
                    },
                    unit_amount: product.price * 100
                },
                quantity: product.quantity
            }
        ],
        mode: "payment",
        success_url: 'http://localhost:3000/success',
        cancel_url: "http://localhost:3000/cancel"

    });
    res.json({id: session.id});
})
app.listen(8000,()=>{
    console.log("Servidor iniciado en el puerto 8000")
})