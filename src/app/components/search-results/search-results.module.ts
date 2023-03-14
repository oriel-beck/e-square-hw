import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { TruncatePipe } from '../../pipes/truncate.pipe';


@NgModule({
  declarations: [
    SearchResultsComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    SearchResultsComponent
  ]
})
export class SearchResultsModule { }
