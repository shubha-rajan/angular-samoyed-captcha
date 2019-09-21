import { Component, OnInit, Input} from '@angular/core';
import { Matrix } from "../captcha-grid/captcha-grid.service"

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.sass']
})
export class MatrixComponent implements OnInit {
  @Input() targetDog: string;
  @Input() otherDog: string;
  @Input() matrix: Matrix;
  constructor() { }

  ngOnInit() {
  }

  getPercentage(count, total) {
    return Math.round(count/total * 100)
  }
}
