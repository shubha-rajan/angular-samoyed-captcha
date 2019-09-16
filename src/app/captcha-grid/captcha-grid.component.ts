import { Component, OnInit } from '@angular/core';
import { CaptchaGridService, CaptchaData } from './captcha-grid.service';
@Component({
  selector: 'app-captcha-grid',
  templateUrl: './captcha-grid.component.html',
  styleUrls: ['./captcha-grid.component.sass'],
  providers:[ CaptchaGridService ]
})

export class CaptchaGridComponent implements OnInit {

  captchaData: CaptchaData;
  doggos = [];
  
  constructor(private captchaGridService: CaptchaGridService ){}
  
 
  ngOnInit() {
    this.captchaGridService.getData()
    .subscribe(data => {
      console.log(data);
      this.captchaData = {
        targetDog: (data as any).identify,
        captchaID:  (data as any).captcha_id,
        dogs: {...data}
     };
     this.generateTiles();
     });
    
  }

  generateTiles() {
    const labels = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9"]
    for (let label of labels) {
      const doggo = this.captchaData.dogs[label];
      this.doggos.push(
        {...doggo, 'label': label}
      )
    }
  
}
}