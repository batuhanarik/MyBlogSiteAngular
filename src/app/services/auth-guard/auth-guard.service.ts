import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');

    return this.authService.isAuthenticated(email, password).pipe(map(x=>{
      if(x.status === true){
        return true;
      }
      else{
        this.router.navigate(["adminlogin"]);
        return false;
      }
    }))

  }
}
