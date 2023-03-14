import { RouterModule, Routes } from '@angular/router'
import { loginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search/search.module').then((m) => m.SearchModule),
    canActivate: [loginGuard]
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./modules/wishlist/wishlist.module').then((m) => m.WishlistModule),
    canActivate: [loginGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
]

export const AppRoutingModule = RouterModule.forRoot(routes);
