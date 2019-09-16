import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-captcha-tile',
  templateUrl: './captcha-tile.component.html',
  styleUrls: ['./captcha-tile.component.sass']
})
export class CaptchaTileComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() label: string
  @Input() match: boolean;
  @Input() targetDog: string;
  ngOnInit() {
    this.setGuessedCorrect();
  }

  selected = false;
  className = "not-selected";
  guessedCorrect = null;

  toggleSelected() {
    this.selected = !this.selected;
    this.className = this.selected ? "selected" : "not-selected";
    this.guessedCorrect = !this.guessedCorrect
  }

  setGuessedCorrect() {
    if (this.match){
      this.guessedCorrect = false;
    } else {
      this.guessedCorrect = true;
    }
  }

}
