import { Component, OnInit } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { ApiService } from './api.service';
const razorKeyId = 'rzp_test_CLkCf27zzOvZWU';
const razorKeySecret = 'jqKiPwZipB9qEjiCEerBS1a5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private winRef: WindowRefService, private apiService: ApiService) { }

  ngOnInit() { }

  createRzpayOrder(amount) {
    console.log(amount);
    // call api to create order_id
    this.payWithRazor(amount);
  }

  payWithRazor(amount) {
    let finalObj = {
      customerDetail: {
        name: 'Ajay Jagtap',
        phone: '7755999578',
        email: 'ajayjagtap.10@gmail.com'
      },
      cardDetail: {
        cardNumber: '5267 3181 8797 5449',
        cardExpDate: '1023',
        cardCvv: '123'
      },
      addressDetail: {
        address: 'pune',
        landmark: 'katraj',
        city: 'pune',
        state: 'MH',
        pincode: 411046
      }
    }
    let options: any = {
      "key": razorKeyId,
      "amount": amount * 100,
      "name": "Ajay Pvt Ltd",
      "description": "Hot Cofee",
      "image": "./assets/images/Ajay 4.jpg",
      "currency": 'INR',
      // "order_id": "order_DaZlswtdcn9UNV", // order_id created by you in backend
      "modal": {
        "escape": false
      },
      "prefill": {
        "name": finalObj.customerDetail.name,
        "contact": finalObj.customerDetail.phone,
        "email": finalObj.customerDetail.email,
        "method": 'card',
        'card[number]': finalObj.cardDetail.cardNumber,
        'card[expiry]': finalObj.cardDetail.cardExpDate,
        'card[cvv]': finalObj.cardDetail.cardCvv
      },
      "notes": {
        "address": finalObj.addressDetail.address + ', ' + finalObj.addressDetail.landmark + ', ' + finalObj.addressDetail.city + ', ' + finalObj.addressDetail.state + '-' + finalObj.addressDetail.pincode
      },
      "theme": {
        "color": "#6fbc29"
      }
    };
    options.handler = ((response) => {
      options.response = response;
      console.log(response);
      console.log(options);
      this.verifyPayment(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    let rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

  verifyPayment(options) {
    this.apiService.verifyPayment(options).subscribe(result => {
      console.log(result);
      let response: any = result;
      if (response.success && response.status) {
        alert(response.status);
      }
    })
  }

}
