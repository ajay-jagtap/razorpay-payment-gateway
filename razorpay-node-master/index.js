const express = require('express')
const app = express();
var Razorpay = require('razorpay');
var cors = require('cors');


const razorKeyId = 'rzp_test_CLkCf27zzOvZWU';
const razorKeySecret = 'jqKiPwZipB9qEjiCEerBS1a5';

var instance = new Razorpay({
  key_id: razorKeyId,
  key_secret: razorKeySecret
})

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.post('/razorPayOrder', (req, res, next) => {
  let options = req.body.options;
  var razorPayOptions = {
    amount: options.amount * 100,
    currency: options.currency,
    receipt: options.response.razorpay_payment_id,
    payment_capture: 0,
  };


  instance.orders.create(razorPayOptions, (err, order) => {
    if (err) {
      console.log(err);
      next(err);
    }
    if (order) {
      res.json({ success: true, status: "Order created Successfully", value: order, key: razorKeyId })
    }
  })
})


app.get('/test', function (req, res) {
  res.send('Hello Test')
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
