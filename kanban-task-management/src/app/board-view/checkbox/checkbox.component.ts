import { ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-checkbox",
  template: `
    <input
      (change)="checked.set(!checked())"
      type="checkbox"
      [checked]="checked()"
      [id]="id()"
      class="sr-only"
    />
    <label
      [htmlFor]="id()"
      class="flex items-center justify-center w-4 h-4 rounded-sm cursor-pointer"
      [class]="checked() ? 'bg-kb-purple' : 'bg-kb-dark-grey border border-kb-medium-grey/24'"
    >
      @if (checked()) {
        <img src="icon-check.svg" alt="Check Icon" />
      }
    </label>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  checked = model<boolean>(false);
  id = input.required();
}
