import { AlertEntity } from "../../1. Domain/alert.entity";
import { SortStrategy } from "./Sorter";

class sortLIFO implements SortStrategy {
  sort(array: AlertEntity[]): AlertEntity[] {
    return array;
  }
}
