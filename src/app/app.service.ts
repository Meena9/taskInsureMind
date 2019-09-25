import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(public http: Http) {}
  data: { from: '2019-08-10'; to: '2019-08-11' };

  getdata() {
    return this.http.post(
      'https://www.insuredmine.xyz/api/api/mailCampaigns/dummyApi',
      this.data
    );
  }
}
