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
  score;
  guesses = {};
  gameComplete : boolean;
  loadingComplete = false;

  constructor(private captchaGridService: CaptchaGridService ){}
  
 
  ngOnInit() {
    this.captchaGridService.getData()
    .subscribe(data => {
      this.captchaData = {
        targetDog: (data as any).identify[0].toUpperCase() + (data as any).identify.substr(1),
        captchaID:  (data as any).captcha_id,
        dogs: {...data}
     };
     this.generateTiles();
     this.setScore();
     this.gameComplete = false;
     this.loadingComplete = true;
     });
  }

  public guessCallback(label: string) {
    this.guesses[label] = !this.guesses[label];
    this.setScore();

  }

  resetGame() {
    this.doggos = [];
    this.ngOnInit();
  }

  setScore () {
    const reducer = (total, currentValue) => {
      if (currentValue) {
        return total + 1;
      } else {
        return total;
      }
    };
    const score = Object.values(this.guesses).reduce(reducer, 0);
    this.score = score;
    
  }

  finishGame() {
    this.gameComplete = true;
  }

  generateTiles() {
    const labels = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9"]
    for (let label of labels) {
      const doggo = this.captchaData.dogs[label];
      if (doggo.match) {
        this.guesses[label] = false;
      } else {
        this.guesses[label] = true;
      }
      this.doggos.push(
        {...doggo, 'label': label}
      )
    }
  
}
}