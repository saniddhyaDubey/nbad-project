import { CanActivateFn, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core";

export const checkTokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("userToken");

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiresAt = payload.exp * 1000;
    if (Date.now() > expiresAt) {
      localStorage.removeItem("userToken");
      router.navigate(["/login"]);
      return false;
    }
    return true;
  } else {
    localStorage.removeItem("userToken");
    router.navigate(["/login"]);
    return false;
  }
};
