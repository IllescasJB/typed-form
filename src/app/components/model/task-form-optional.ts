import { FormControl, FormGroup, FormArray } from '@angular/forms';

export interface TaskFormOptional {
  name: FormControl<string>;
  select: FormControl<number>;
  selectMulti: FormControl<Array<string>>;
  comments: FormControl<string>;
  cc: FormControl<string | null>;
  date: FormControl<string | null>;
  natureRequest: FormGroup<NatureRequestFormOptional>;
  reviewableStatus: FormControl<string>;
  subtasks?: FormArray<FormGroup<SubtaskFormOptional>>;
}

export interface NatureRequestFormOptional {
  adds: FormControl<boolean>;
  keywords: FormControl<boolean>;
  extensions: FormControl<boolean>;
}

export interface SubtaskFormOptional {
  name: FormControl<string>;
  comments: FormControl<string>;
}
