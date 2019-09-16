import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CaptchaGridService {
  constructor(private http: HttpClient) { }
  dataUrl = 'https://jamie-alice-classifier-251416.appspot.com/';

    getData() {
    return this.http.get(this.dataUrl);
    }
}

export interface CaptchaData {
    captchaID: string;
    targetDog: string;
    dogs: object;
  }