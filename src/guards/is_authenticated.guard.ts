import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const IsAuthenticatedGuard = () => {
  const isAuthenticated = inject(AuthService).isAuthenticated();
  const router = inject(Router);

  if (!isAuthenticated) {
    alert("Please login");
    return router.parseUrl("/auth/login");
  }

  return isAuthenticated;
};
