import { CanActivateFn, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core";

export const checkLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("userToken");

  if (!token) {
    return true;
  } else {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiresAt = payload.exp * 1000;
    if (Date.now() > expiresAt) {
      localStorage.removeItem("userToken");
      return true;
    }
    router.navigate(["/dashboard"]);
    return false;
  }
};
