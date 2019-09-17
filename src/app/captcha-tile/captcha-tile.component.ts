import { Component, OnChanges, Input} from '@angular/core';

@Component({
  selector: 'app-captcha-tile',
  templateUrl: './captcha-tile.component.html',
  styleUrls: ['./captcha-tile.component.sass']
})
export class CaptchaTileComponent implements OnChanges{
  @Input() imageUrl: string;
  @Input() label: string
  @Input() match: boolean;
  @Input() updateScoreCallback: Function;
  @Input() gameComplete:boolean;


  ngOnChanges(){
    if (this.gameComplete == true){
      if ((this.selected == true && this.match == true)|| (this.selected == false && this.match == false)) {
        this.className = "correct";
      } else {
        this.className = "incorrect";
      }
    }
  }
  selected = false;
  className = "not-selected";


  toggleSelected() {
    this.selected = !this.selected;
    this.className = this.selected ? "selected" : "not-selected";
    this.updateScoreCallback(this.label)
  }



}
