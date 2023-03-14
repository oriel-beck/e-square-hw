import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { Store } from "@ngrx/store";
import { selectUsername } from "../store/selectors/user.selector";
import { map } from "rxjs";

export const loginGuard = () => {
    const router = inject(Router);
    const store = inject(Store);
    return store.select(selectUsername).pipe(map((username) => {
        if (!username) {
            return router.createUrlTree(['login']);
        } else {
            return true;
        }
    }))
}