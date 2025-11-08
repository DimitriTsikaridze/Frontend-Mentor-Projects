import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { DropdownComponent } from "../board-view/dropdown/dropdown.component";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { Task } from "../boars.model";

@Component({
  selector: "app-add-task",
  imports: [DropdownComponent, ReactiveFormsModule],
  templateUrl: "./add-task.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent {
  dialogData = inject<{ columns: string[] }>(DIALOG_DATA);
  submitFormChanged = output<Task>();
  private dialogRef = inject(DialogRef);

  form = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    subtasks: new FormArray([new FormControl(""), new FormControl("")]),
    status: new FormControl(this.dialogData.columns[0]),
  });

  get subtasks() {
    return this.form.get("subtasks") as FormArray;
  }

  addNewSubtask() {
    this.subtasks.push(new FormControl(""));
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  submitForm() {
    if (this.form.invalid) return;
    const { description, status, subtasks, title } = this.form.getRawValue();
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      subtasks: subtasks
        .filter((subtask) => subtask)
        .map((subtask) => ({ title: subtask, isCompleted: false })),
    };
    this.submitFormChanged.emit(task);
    this.dialogRef.close();
  }
}
