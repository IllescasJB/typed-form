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


import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogContentTypedFormComponent } from '../dialog-content-typed-form/dialog-content-typed-form.component';
import { NatureRequestFormOptional, SubtaskFormOptional, TaskFormOptional } from '../model/task-form-optional';
import { NatureRequestOptional, SubtaskRequestOptional, TaskRequestOptional } from '../model/task-request-optional';

@Component({
  selector: 'app-typed-form-optional',
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
  templateUrl: './typed-form-optional.component.html',
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
export class TypedFormOptionalComponent implements OnInit {
  loading: boolean = false;
  multiValues: string[] = ['Multi 1', 'Multi 2', 'Multi 3', 'Multi 4', 'Multi 5', 'Multi 6'];

  taskForm = new FormGroup<TaskFormOptional>({
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
    cc: new FormControl<string | null>(null, {
      validators: Validators.maxLength(5)
    }),
    date: new FormControl<string | null>(null),
    natureRequest: new FormGroup<NatureRequestFormOptional>({
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
    })
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

  private async fakeRequest(body: TaskRequestOptional): Promise<void> {
    await new Promise(f => setTimeout(f, 1000));
    this.dialog.open(DialogContentTypedFormComponent, {
      data: {
        content: body
      }
    });
  }

  addNewSubtasks(): void {
    if (!this.taskForm.controls.subtasks) {
      this.taskForm.setControl("subtasks", new FormArray<FormGroup<SubtaskFormOptional>>([]));
    }
    this.taskForm.controls.subtasks?.push(new FormGroup<SubtaskFormOptional>({
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
    this.taskForm.controls.subtasks?.removeAt(index);
    if (this.taskForm.controls.subtasks?.controls.length === 0) {
      this.taskForm.removeControl('subtasks');
    }
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

  get cc(): FormControl<string | null> {
    return this.taskForm.controls.cc;
  }

  get date(): FormControl<string | null> {
    return this.taskForm.controls.date;
  }

  get subtasks(): FormArray<FormGroup<SubtaskFormOptional>> | undefined {
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
