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

  ngOnInit() {
    this.jamieScore = Math.round(this.jamie * 100);
    this.aliceScore = Math.round(this.alice * 100);
  }

}
