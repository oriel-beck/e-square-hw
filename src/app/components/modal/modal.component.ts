import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../store/models/book.model';
import type { ModalData } from './modal.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() actionTriggered = new EventEmitter<Book>();

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) { }

  openPreview() {
    window.open(this.data.book.volumeInfo.previewLink, '_blank');
  }

  triggerAction() {
    this.actionTriggered.emit(this.data.book);
  }
}
