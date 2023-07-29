import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from "@angular/core"

@Directive({
  selector: "[appOutsideClick]",
  standalone: true,
})
export class OutsideClickDirective {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  @Output() outsideClick = new EventEmitter<void>()

  @HostListener("document:click", ["$event.target"])
  onClick(target: Element) {
    const clickedInside = this.elementRef.nativeElement.contains(target)
    if (!clickedInside) {
      this.outsideClick.emit()
    }
  }
}
