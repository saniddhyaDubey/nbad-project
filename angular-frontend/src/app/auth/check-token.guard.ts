import { CanActivateFn, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core";

export const checkTokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("userToken");
  console.log("Token fecthed: ", token);

  if (token) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
