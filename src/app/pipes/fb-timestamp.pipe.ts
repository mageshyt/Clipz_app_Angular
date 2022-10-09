import firebase from 'firebase/compat/app';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fbTimestamp',
})
export class FbTimestampPipe implements PipeTransform {
  constructor(private dataPipe: DatePipe) {}

  transform(value: firebase.firestore.FieldValue ) {
    const date = (value as firebase.firestore.Timestamp).toDate();
    return this.dataPipe.transform(date, 'dd/MM/yyyy');
  }
}
