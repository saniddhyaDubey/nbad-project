import { Component } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { CleanEnergySummaryComponent } from "../clean-energy-summary/clean-energy-summary.component";
import { TechstackDetailsComponent } from "../techstack-details/techstack-details.component";

@Component({
  selector: "app-dashboard",
  imports: [
    NavbarComponent,
    CleanEnergySummaryComponent,
    TechstackDetailsComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {}
