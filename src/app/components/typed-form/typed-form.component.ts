import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TaskForm, NatureRequestForm, SubtaskForm } from '../model/task-form';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogContentTypedFormComponent } from '../dialog-content-typed-form/dialog-content-typed-form.component';
import { TaskRequest } from '../model/task-request';

@Component({
  selector: 'app-typed-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './typed-form.component.html',
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200)
      ]),
      transition(':leave',
        animate(300, style({ opacity: 0 })))
    ])
  ]
})
export class TypedFormComponent implements OnInit {
  loading: boolean = false;
  multiValues: string[] = ['Multi 1', 'Multi 2', 'Multi 3', 'Multi 4', 'Multi 5', 'Multi 6'];

  taskForm = new FormGroup<TaskForm>({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    select: new FormControl<number>(-1, {
      nonNullable: true,
      validators: (control) => this.validateSelect(control, -1)
    }),
    selectMulti: new FormControl<Array<string>>([], {
      nonNullable: true,
      validators: (control) => this.validateSelect(control, [])
    }),
    comments: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    cc: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(5)]
    }),
    date: new FormControl<string>('', {
      nonNullable: true
    }),
    natureRequest: new FormGroup<NatureRequestForm>({
      adds: new FormControl<boolean>(false, {
        nonNullable: true
      }),
      keywords: new FormControl<boolean>(false, {
        nonNullable: true
      }),
      extensions: new FormControl<boolean>(false, {
        nonNullable: true
      })
    }),
    reviewableStatus: new FormControl<string>('1', {
      nonNullable: true
    }),
    subtasks: new FormArray<FormGroup<SubtaskForm>>([])
  });

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    if (this.taskForm.valid) {
      this.loading = true;
      this.taskForm.disable();
      await this.fakeRequest(this.taskForm.getRawValue());
      this.loading = false;
      this.taskForm.enable();
    }
  }

  private async fakeRequest(body: TaskRequest): Promise<void> {
    await new Promise(f => setTimeout(f, 1000));
    this.dialog.open(DialogContentTypedFormComponent, {
      data: {
        content: body
      }
    });
  }

  addNewSubtasks(): void {
    this.taskForm.controls.subtasks.push(new FormGroup<SubtaskForm>({
      name: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required
      }),
      comments: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.max(100)]
      })
    }));
  }

  removeSubtask(index: number): void {
    this.taskForm.controls.subtasks.removeAt(index);
  }

  get name(): FormControl<string> {
    return this.taskForm.controls.name;
  }

  get select(): FormControl<number> {
    return this.taskForm.controls.select;
  }

  get selectMulti(): FormControl<Array<string>> {
    return this.taskForm.controls.selectMulti;
  }

  get comments(): FormControl<string> {
    return this.taskForm.controls.comments;
  }

  get cc(): FormControl<string> {
    return this.taskForm.controls.cc;
  }

  get date(): FormControl<string> {
    return this.taskForm.controls.date;
  }

  get subtasks(): FormArray<FormGroup<SubtaskForm>> {
    return this.taskForm.controls.subtasks;
  }


  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if (control.hasError('errorSelect')) {
      return 'You must select a value';
    }
    if (control.hasError('maxlength')) {
      return 'Max value 5';
    }
    if (control.hasError('matDatepickerParse')) {
      return 'Invalid date';
    }
    return '';
  }

  validateSelect(control: AbstractControl, defaultValue: unknown): ValidationErrors | null {
    if (Array.isArray(defaultValue))
      return control.value.length === 0 ? { errorSelect: true } : null;
    return control.value === defaultValue ? { errorSelect: true } : null;
  }

}
