import { FormControl, FormGroup, FormArray } from '@angular/forms';

export type TaskForm = {
  name: FormControl<string>;
  select: FormControl<number>;
  selectMulti: FormControl<Array<string>>;
  comments: FormControl<string>;
  cc: FormControl<string>;
  date: FormControl<string>;
  natureRequest: FormGroup<NatureRequestForm>;
  reviewableStatus: FormControl<string>;
  subtasks: FormArray<FormGroup<SubtaskForm>>;
}

export type NatureRequestForm = {
  adds: FormControl<boolean>;
  keywords: FormControl<boolean>;
  extensions: FormControl<boolean>;
}

export type SubtaskForm = {
  name: FormControl<string>;
  comments: FormControl<string>;
}
