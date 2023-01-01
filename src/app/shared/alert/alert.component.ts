import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() color = 'blue';

  get bgColor() {
   
    if(this.color === 'green') {
      return 'bg-[#38c172]';
    }
    return `bg-${this.color}-400`;
  }

  constructor() {
    console.log('alert', this.color);
  }

  ngOnInit(): void {}
}
