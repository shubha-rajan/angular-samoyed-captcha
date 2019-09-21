import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CaptchaGridService {
  constructor(private http: HttpClient) { }
  dataUrl = 'http://localhost:5000/';

    getData() {
    return this.http.get(this.dataUrl + "");
    }

    getMatrix() {
      return this.http.get(this.dataUrl + "matrix")
    }

    sendResults(results: Object, captchaID: string) {
      const body = results;
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post<Object>(this.dataUrl + "response/" + captchaID,  body, {headers: headers});
    }

    predict(url: string) {
      const body = {'url': url};
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.post<Object>(this.dataUrl + "predict", body, {headers: headers});
    }
}

export interface CaptchaData {
    captchaID: string;
    targetDog: string;
    dogs: object;
  }

export interface Matrix {
  truePos: number;
  falsePos: number;
  trueNeg: number;
  falseNeg: number;
  matchTotal: number;
  nonMatchTotal:number;
}
