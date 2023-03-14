import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SearchResultsModule } from '../../components/search-results/search-results.module';
import { MatDialogModule } from '@angular/material/dialog';
import { Route, RouterModule } from '@angular/router';
import { ModalModule } from '../../components/modal/modal.module';
import { PaginatorModule } from '../../components/paginator/paginator.module';

const routes: Route[] = [
  {
    path: '',
    component: WishlistComponent
  }
]


@NgModule({
  declarations: [
    WishlistComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarModule,
    SearchResultsModule,
    MatDialogModule,
    ModalModule,
    PaginatorModule
  ]
})
export class WishlistModule { }
