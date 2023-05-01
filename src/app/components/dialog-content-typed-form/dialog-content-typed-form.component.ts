import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TaskRequestOptional } from '../model/task-request-optional';
import { TaskRequest } from '../model/task-request';

@Component({
  selector: 'app-dialog-content-typed-form',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-content-typed-form.component.html'
})
export class DialogContentTypedFormComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    content: TaskRequest | TaskRequestOptional
  }) { }

}
