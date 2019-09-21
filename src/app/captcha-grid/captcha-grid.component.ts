import { Component, OnInit } from '@angular/core';
import { CaptchaGridService, CaptchaData, Matrix } from './captcha-grid.service';
import { match } from 'minimatch';
@Component({
  selector: 'app-captcha-grid',
  templateUrl: './captcha-grid.component.html',
  styleUrls: ['./captcha-grid.component.sass'],
  providers:[ CaptchaGridService ]
})

export class CaptchaGridComponent implements OnInit {

  captchaData: CaptchaData;
  modelMatrix: Matrix;
  loadedModelMatrix: boolean;
  doggos = [];
  score;
  guesses = {};
  gameComplete : boolean;
  loadingComplete = false;
  confusionMatrix: Matrix;
  predictionsComplete: boolean;
  predictions = [];


  constructor(private captchaGridService: CaptchaGridService ){}
  
 
  ngOnInit() {
    this.captchaGridService.getData()
    .subscribe(data => {
      this.captchaData = {
        targetDog: (data as any).label[0].toUpperCase() + (data as any).label.substr(1),
        captchaID:  (data as any).captcha_id,
        dogs: {...data}
     };
     this.generateTiles();
     this.loadingComplete = true;
     this.setScore();
     this.gameComplete = false;
     this.predictionsComplete = false;
     this.loadedModelMatrix = false;
     });
  }

  public guessCallback(label: string) {
    this.guesses[label] = !this.guesses[label];
    this.setScore();

  }

  resetGame() {
    this.doggos = [];
    this.predictions = [];
    this.loadingComplete = false
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

  getPredictions(){
    for (let doggo of this.doggos){
      this.captchaGridService.predict(doggo.url)
        .subscribe(data => {
        let prediction = data;
        let guess: string;
        if ((this.guesses[doggo.label] && doggo.match) || (!this.guesses[doggo.label] && !doggo.match)){
          guess = this.captchaData.targetDog;
        } else {
          guess = this.otherDog();
        }
        prediction['guess'] = guess;
        prediction['actual'] = doggo.match ? this.captchaData.targetDog : this.otherDog();
        this.predictions.push(prediction);          
      })
    }
    this.predictionsComplete = true;
  }

  getModelMatrix(){
    this.captchaGridService.getMatrix()
      .subscribe(data => {     
          this.modelMatrix = {
            truePos: data[this.captchaData.targetDog.toLowerCase()].correct,
            trueNeg: data[this.otherDog().toLowerCase()].correct,
            falsePos: data[this.captchaData.targetDog.toLowerCase()].incorrect,
            falseNeg: data[this.otherDog().toLowerCase()].incorrect,
            matchTotal: (data[this.captchaData.targetDog.toLowerCase()].correct 
              + data[this.otherDog().toLowerCase()].incorrect),
            nonMatchTotal: (data[this.otherDog().toLowerCase()].correct 
              + data[this.captchaData.targetDog.toLowerCase()].incorrect)
          };
          this.loadedModelMatrix = true;
      });
      
      
  }

  sendResults(){
    this.captchaGridService.sendResults(
      this.guesses, this.captchaData.captchaID);
  }

  finishGame() {
    this.sendResults();
    this.gameComplete = true;

    this.setConfusionMatrix();
    this.getModelMatrix();
    this.getPredictions();
  }
  
  setConfusionMatrix() {
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

    this.confusionMatrix = {
      truePos: this.doggos.reduce(countTruePos, 0),
      trueNeg: this.doggos.reduce(countTrueNeg, 0),
      falsePos: this.doggos.reduce(countFalsePos, 0),
      falseNeg: this.doggos.reduce(countFalseNeg, 0),
      matchTotal: this.matchCount(),
      nonMatchTotal: 9 - this.matchCount()
    }
    
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