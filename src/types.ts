export enum AlertType {
  Informativa,
  Urgente,
}

export type TopicName = string;

export interface ErrorWithStatus extends Error {
  status: number;
}
