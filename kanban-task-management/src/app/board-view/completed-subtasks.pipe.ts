import { Pipe, PipeTransform } from "@angular/core";
import { Subtask } from "../boars.model";

@Pipe({
  name: "completedSubtasks",
})
export class CompletedSubtasksPipe implements PipeTransform {
  transform(value: Subtask[]): number {
    return value.filter((v) => v.isCompleted).length;
  }
}
