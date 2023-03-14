import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { Route, RouterModule } from '@angular/router';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SearchResultsModule } from '../../components/search-results/search-results.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from '../../components/modal/modal.module';
import { PaginatorModule } from '../../components/paginator/paginator.module';

const routes: Route[] = [
  {
    path: '',
    component: SearchComponent
  }
]

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarModule,
    SearchResultsModule,
    MatDialogModule,
    ModalModule,
    PaginatorModule
  ],
})
export class SearchModule { }
