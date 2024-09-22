import { ChangeDetectionStrategy, Component, output } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-search-input",
  standalone: true,
  templateUrl: "./search-input.component.html",
  styleUrl: "./search-input.component.scss",
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  ipControl = new FormControl("", {
    validators: [
      this.ipAddressValidator, // Custom range validator for IP parts
      Validators.required,
      Validators.pattern("^([0-9]{1,3}\\.){3}[0-9]{1,3}$"), // Validate IP format
    ],
    nonNullable: true, // Ensure value is not nullable
  });

  submitIp = output<string>();

  onSubmit() {
    if (this.ipControl.invalid) return;
    this.submitIp.emit(this.ipControl.value);
  }

  private ipAddressValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (value) {
      const parts = value.split(".");
      if (
        parts.length === 4 &&
        parts.every((part: string) => +part >= 0 && +part <= 255)
      ) {
        return null; // IP is valid
      }
    }
    return { invalidIp: true }; // IP is invalid
  }
}
