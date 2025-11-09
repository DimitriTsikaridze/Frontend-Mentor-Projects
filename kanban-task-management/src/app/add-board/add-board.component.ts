import { DialogRef } from "@angular/cdk/dialog";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Board, Task } from "../boars.model";

@Component({
  selector: "app-add-board",
  imports: [ReactiveFormsModule],
  templateUrl: "./add-board.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBoardComponent {
  form = new FormGroup({
    name: new FormControl("testBoard", Validators.required),
    columns: new FormArray([new FormControl("Todo"), new FormControl("Doing")]),
  });

  submitFormChanged = output<Board>();

  private dialogRef = inject(DialogRef);

  get columns() {
    return this.form.get("columns") as FormArray;
  }

  removeColumn(index: number) {
    this.columns.removeAt(index);
  }

  addColumn() {
    this.columns.push(new FormControl(""));
  }

  submitForm() {
    if (this.form.invalid) return;
    const { name, columns } = this.form.getRawValue();
    this.submitFormChanged.emit({
      name,
      columns: columns.map((c) => ({ name: c, tasks: [] as Task[] })),
    });
    this.dialogRef.close();
  }
}
