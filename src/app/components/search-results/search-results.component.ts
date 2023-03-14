import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { BooksState } from '../../store/reducers/books.reducer';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
    @Input() results: BooksState['books'] | null = [];
    @Output() cardClicked = new EventEmitter<string>();
}
