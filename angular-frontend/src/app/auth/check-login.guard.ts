import { CanActivateFn, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core";

export const checkLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("userToken");

  if (!token) {
    return true;
  } else {
    router.navigate(["/dashboard"]);
    return false;
  }
};
