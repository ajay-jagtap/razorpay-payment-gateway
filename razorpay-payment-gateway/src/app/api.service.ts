import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  verifyPayment(options) {
    try {
      let headers = new HttpHeaders({ "ContentType": "application/JSON" });
      headers.append('Access-Control-Allow-Origin', 'true');

      return this.http.post(`${environment.apiUrl}/razorPayOrder`, options, { headers });
    } catch (error) {
      console.log(error);
    }
  }
}
