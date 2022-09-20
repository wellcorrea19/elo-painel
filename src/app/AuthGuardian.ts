import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardian implements CanActivate {

    constructor(private router: Router) {}
    token = ''
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.token = localStorage.getItem('token') || ''
        if (this.token.length > 6) {
            return true
        }

        // not logged in so redirect to login page with the return url
        await this.router.navigate(['/']);
        return false;
    }
}
