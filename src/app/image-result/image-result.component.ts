import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-result',
  templateUrl: './image-result.component.html',
  styleUrls: ['./image-result.component.sass']
})
export class ImageResultComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() guess: string;
  @Input() actual: string;
  @Input() jamie: number;
  @Input() alice: number;

  jamieScore: number;
  aliceScore: number;
  className: string;

  setClassName() {
    if (this.guess == this.actual){
      this.className = "correct";
    } else {
      this.className = "incorrect";
    }
  }

  ngOnInit() {
    this.jamieScore = Math.round(this.jamie * 100);
    this.aliceScore = Math.round(this.alice * 100);
    this.setClassName();
  }

}
