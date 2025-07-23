import { Component, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  imports: [SidebarComponent, RouterOutlet, HeaderComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
