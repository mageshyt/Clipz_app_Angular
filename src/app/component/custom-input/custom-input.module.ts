import { CustomInputComponent } from './custom-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomInputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CustomInputComponent],
})
export class CustomInputModule {}
