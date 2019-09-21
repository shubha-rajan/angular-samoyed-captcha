import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.sass']
})
export class ResultTableComponent {
  @Input() predictions: Array<Object>;
}
