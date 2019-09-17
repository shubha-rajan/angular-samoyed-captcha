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
  @Input() updateScoreCallback: Function;
  @Input() targetDog: string;
  ngOnInit() {
  }

  selected = false;
  className = "not-selected";


  toggleSelected() {
    this.selected = !this.selected;
    this.className = this.selected ? "selected" : "not-selected";
    this.updateScoreCallback(this.label)
    
  }



}
