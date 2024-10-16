import { Directive, EventEmitter, HostListener, Output } from "@angular/core"

@Directive({
  selector: "[appSubmitOnEnter]",
  standalone: true,
})
export class SubmitOnEnterDirective {
  constructor() {}
  @Output() submitEvent = new EventEmitter()

  @HostListener("keydown", ["$event"])
  keyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.submitEvent.emit()
    }
  }
}
