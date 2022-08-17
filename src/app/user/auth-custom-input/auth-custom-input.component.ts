import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-auth-custom-input',
  templateUrl: './auth-custom-input.component.html',
  styleUrls: ['./auth-custom-input.component.scss'],
})
export class AuthCustomInputComponent implements OnInit {
  @Input() label?: string;
  @Input() type?: string;
  @Input() placeholder?: string;
  @Input() pattern?: string;
  @Input() controller: any = new FormControl('');
  @Input() required?: boolean;

  constructor() {}

  ngOnInit(): void {}
}
