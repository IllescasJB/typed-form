export interface TaskRequestOptional {
  name: string;
  select: number;
  selectMulti: Array<string>;
  comments: string;
  cc: string | null;
  date: string | null;
  natureRequest: NatureRequestOptional;
  reviewableStatus: string;
  subtasks?: Array<SubtaskRequestOptional>;
}

export interface NatureRequestOptional {
  adds: boolean;
  keywords: boolean;
  extensions: boolean;
}

export interface SubtaskRequestOptional {
  name: string;
  comments: string;
}
