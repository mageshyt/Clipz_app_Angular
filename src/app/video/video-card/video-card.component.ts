import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClipService, IClip } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss'],
})
export class VideoCardComponent implements OnInit {
  @Input() imgUrl?: string;
  @Input() title?: string;
  @Input() videoData: any;
  @Output() openModal: EventEmitter<IClip> = new EventEmitter();
  edit($event: any) {
    console.log('edit', $event);
  }

  constructor(private modal: ModalService, private clip: ClipService) {}

  ngOnInit(): void {}

  showVideoModal($event: any, clip: IClip) {
    $event.preventDefault();
    this.openModal.emit(clip);
  }

  delete($event: any, clipId: string) {
    $event.preventDefault();
    // console.log('delete', clipId);
    this.clip.deleteClip(clipId);
  }
}
