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
  confusionMatrix = {
    truePos: null,
    falsePos: null,
    trueNeg: null,
    falseNeg: null,
  };


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

  otherDog() {
    if (this.captchaData.targetDog === 'Jamie') {
      return 'Alice';
    } else {
      return 'Jamie';
    }
  }

  matchCount() {
    const countMatches = (total, doggo) => {
      if (doggo.match) {
        return total + 1;
      } else {
        return total;
      }
    };

    return this.doggos.reduce(countMatches, 0);
  }

  getPercentage(count, total) {
    return Math.round(count/total * 100)
  }
  finishGame() {
    const countFalseNeg = (total, doggo) => {
      if (!this.guesses[doggo.label] && doggo.match) {
        return total + 1;
      } else {
        return total;
      }
    };
    const countTrueNeg = (total, doggo) => {
      if (this.guesses[doggo.label] && !doggo.match) {
        return total + 1;
      } else {
        return total;
      }
    };
    const countFalsePos = (total, doggo) => {
      if (!this.guesses[doggo.label] && !doggo.match) {
        return total + 1;
      } else {
        return total;
      }
    };

    const countTruePos = (total, doggo) => {
      if (this.guesses[doggo.label] && doggo.match) {
        return total + 1;
      } else {
        return total;
      }
    };

    this.gameComplete = true;
    this.confusionMatrix.truePos = this.doggos.reduce(countTruePos, 0);
    this.confusionMatrix.trueNeg = this.doggos.reduce(countTrueNeg, 0);
    this.confusionMatrix.falsePos = this.doggos.reduce(countFalsePos, 0);
    this.confusionMatrix.falseNeg = this.doggos.reduce(countFalseNeg, 0);
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