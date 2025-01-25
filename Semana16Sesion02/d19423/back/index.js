const cors = require('cors');
const express = require('express');
require('dotenv').config();

const Culqi = require('culqi-node');
const culqi = new Culqi({
    privateKey: process.env.privateKey,
    publicKey: process.env.publicKey,
    pciCompliant: true
})

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    res.send("Hola desde el back de culqi");
})

app.post('/api/process/pay', async (req, res) => {
    const producto = req.body;
    const mires = await culqi.tokens.createToken({
        card_number: producto.creditcard,
        cvv: producto.cvv,
        expiration_month: producto.month,
        expiration_year: producto.year,
        email: producto.email
    }).then( (data)=>{
      //  console.log(data);
        try {
             culqi.charges.createCharge({
                amount: producto.amount,
                currency_code: producto.currency_code,
                email: producto.email,
                installments: producto.installments,
                description: producto.description,
                source_id: data.id
            }).then((respuesta)=>{
                console.log(respuesta);
                res.send({ message: respuesta });
            }).catch(err=>{
                res.send({ message: err});
            })
        } catch (error) {
            res.send({ message: error});
        }
    }).catch(err=>{
        res.send({ message: err});
    })

    
})

app.listen(PORT, () => {
    console.log("Servidor levantado en el puerto " + PORT);
})