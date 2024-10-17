import { Component, inject } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StepWizardService } from './step-wizard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [SidebarComponent, ReactiveFormsModule],
})
export class AppComponent {
  private fb = inject(NonNullableFormBuilder);
  private activeStep = inject(StepWizardService).activeStep;

  form = this.fb.group({
    personalInfo: this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required]],
    }),
  });

  nextStep() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.activeStep.update((activeStep) => (activeStep += 1));
  }

  hasRequiredError(controlName: string) {
    const control = this.form.get(controlName);
    if (control) {
      return control.touched && control.hasError('required');
    }
    return false;
  }
}
