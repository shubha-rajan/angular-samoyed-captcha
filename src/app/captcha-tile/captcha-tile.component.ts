import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-captcha-tile',
  templateUrl: './captcha-tile.component.html',
  styleUrls: ['./captcha-tile.component.sass']
})
export class CaptchaTileComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() jamie: boolean;
  @Input() alice: boolean;
  ngOnInit() {
  }

  selected = false;
  className = "not-selected";

  toggleSelected() {
    this.selected = !this.selected;
    this.className = this.selected ? "selected" : "not-selected"
  }


}
