import { Component } from "@angular/core";
import { RouterOutlet, NavigationEnd, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoginRoute(): boolean {
    return this.router.url.startsWith("/login");
  }
}
