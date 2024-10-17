import { Component, Input, inject } from '@angular/core';
import { StepWizardService } from '../step-wizard.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  activeStep = inject(StepWizardService).activeStep;

  protected steps = [
    {
      stepNumber: 1,
      stepTitle: 'Step 1',
      stepDescription: 'Your info',
    },
    {
      stepNumber: 2,
      stepTitle: 'Step 2',
      stepDescription: 'Select plan',
    },
    {
      stepNumber: 3,
      stepTitle: 'Step 3',
      stepDescription: 'Add-ons',
    },
    {
      stepNumber: 4,
      stepTitle: 'Step 4',
      stepDescription: 'Summary',
    },
  ];
}
