const express = require('express');
const PayOS = require('@payos/node');

const payos = new PayOS('client_id', 'apiKey', 'checksumKey');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:3000';
app.post('/create-payment-link', async(req,res)=>{
    const order = {
        amount: 65000,
        description: 'Thanh toan ve xem phim',
        orderCode: 10,
        returnURL: `${YOUR_DOMAIN}/sucess.html`,
        cancelURL: `${YOUR_DOMAIN}/cancel.html`
    };
    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303, paymentLink.checkoutUrl);
})