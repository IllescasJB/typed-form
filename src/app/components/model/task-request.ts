export interface TaskRequest {
  name: string;
  select: number;
  selectMulti: Array<string>;
  comments: string;
  cc: string;
  date: string;
  natureRequest: NatureRequest;
  reviewableStatus: string;
  subtasks: Array<SubtaskRequest>;
}

export interface NatureRequest {
  adds: boolean;
  keywords: boolean;
  extensions: boolean;
}

export interface SubtaskRequest {
  name: string;
  comments: string;
}
