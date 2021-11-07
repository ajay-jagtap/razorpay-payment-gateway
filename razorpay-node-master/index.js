const express = require('express')
var bodyParser = require('body-parser')
const app = express();
var Razorpay = require('razorpay');
var cors = require('cors');

const razorKeyId = 'rzp_test_CLkCf27zzOvZWU';
const razorKeySecret = 'jqKiPwZipB9qEjiCEerBS1a5';

var instance = new Razorpay({
  key_id: razorKeyId,
  key_secret: razorKeySecret
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use cors
app.use(cors());

app.post('/razorPayOrder', (req, res, next) => {
  console.log(req.body);
  let options = req.body;
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


app.get('/', function (req, res) {
  console.log('Hello App');
  res.json({ success: true, status: "Hello App", value: 'Hello App' })
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
