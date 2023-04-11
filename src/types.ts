export enum AlertType {
  Informativa = "INFORMATIVA",
  Urgente = "URGENTE",
}

export type TopicName = string;

export interface ErrorWithStatus extends Error {
  status: number;
}
