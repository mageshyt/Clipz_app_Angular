import { FormControl, FormGroup } from '@angular/forms';
import { ClipService, IClip } from './../../services/clip.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { VideoCardComponent } from '../video-card/video-card.component';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit, OnDestroy, OnChanges {
  [x: string]: any;
  @Input() activeClip?: IClip;
  constructor(private modal: ModalService, private clips: ClipService) {}
  ngOnInit(): void {
    this.modal.registerModal('video');
  }
  inSubmission: boolean = false;
  title = new FormControl('');

  EditForm = new FormGroup({
    title: this.title,
  });

  ngOnDestroy(): void {
    this.modal.unregisterModal('video');
  }

  //! for alert component
  alert: any = {
    show: false,
    message: '',
    alertColor: '',
  };
  ngOnChanges(): void {
    if (this.activeClip) {
      this.title.setValue(this.activeClip.title);
    }
  }
  submit = async ($event: Event) => {
    $event.preventDefault();
    this.inSubmission = true;
    const { title } = this.EditForm.value;

    if (title && this.activeClip) {
      this.alert.show = true;
      this.alert.message = 'Video updating...';
      this.alert.alertColor = 'blue';
      try {
        await this.clips.updateClip(title, this.activeClip.fileName);
        this.alert.show = true;
        this.alert.message = 'Video updated successfully';
        this.alert.alertColor = 'green';
      } catch (err) {
        console.log(err);
        this.alert.message = 'Video update failed';
        this.alert.alertColor = 'red';
      }
    }
  };
}
