import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { checkTokenGuard } from "./auth/check-token.guard";
import { checkLoginGuard } from "./auth/check-login.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SummaryComponent } from "./summary/summary.component";
import { ReportsComponent } from "./reports/reports.component";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [checkLoginGuard] },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [checkTokenGuard],
  },
  {
    path: "summary",
    component: SummaryComponent,
    canActivate: [checkTokenGuard],
  },
  {
    path: "reports",
    component: ReportsComponent,
    canActivate: [checkTokenGuard],
  },
];
