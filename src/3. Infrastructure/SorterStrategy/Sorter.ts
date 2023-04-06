import { AlertEntity } from "../../Alerts/1.Domain/alert.entity";

export interface SortStrategy {
  sort(array: AlertEntity[]): AlertEntity[];
}

export class Sorter {
  constructor(private sorter: SortStrategy) {}

  sort(array: AlertEntity[]): AlertEntity[] {
    return this.sorter.sort(array);
  }
}
