import { signal } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StepWizardService {
  activeStep = signal(1);
}
