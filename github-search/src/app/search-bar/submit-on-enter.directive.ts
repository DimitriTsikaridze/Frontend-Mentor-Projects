import { Directive, EventEmitter, HostListener, Output } from "@angular/core"

@Directive({
  selector: "[appSubmitOnEnter]",
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
