import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmptySearch, LoadBooks, LoadSelectedBook, UnselectBook, UpdatePage, UpdateQuery } from '../../store/actions/books.actions';
import { selectBooksArray, selectBooksMaxResults, selectPage, selectSelectedBook } from '../../store/selectors/books.selector';
import { selectUsername } from '../../store/selectors/user.selector';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';
import { AddBook } from '../../store/actions/user.actions';

import type { Book } from '../../store/models/book.model';
import type { PageEvent } from '@angular/material/paginator';
import type { AppState } from '../../store/models/app.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  books$ = this.store.select(selectBooksArray);
  booksMaxResults$ = this.store.select(selectBooksMaxResults);
  username$ = this.store.select(selectUsername);
  selectedBook$ = this.store.select(selectSelectedBook);
  pageIndex$ = this.store.select(selectPage);
  sub = new Subscription();

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const dialogSub = this.selectedBook$.subscribe({
      next: (book) => {
        if (book) {
          const ref = this.dialog.open(ModalComponent, {
            data: { book, actionLabel: 'Add to Wishlist' }
          });

          const wishSub = ref.componentInstance.actionTriggered.subscribe({
            next: (book: Book) => {
              this.store.dispatch(AddBook({ book }))
            }
          });

          const afterCloseSub = ref.afterClosed().subscribe({
            next: () => {
              this.store.dispatch(UnselectBook());
            }
          });

          this.sub.add(wishSub);
          this.sub.add(afterCloseSub);
        }
      }
    });
    this.sub.add(dialogSub);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  search(query: string) {
    if (!query) {
      this.store.dispatch(EmptySearch());
    } else {
      this.store.dispatch(UpdateQuery({ query: query + '+intitle' }));
      this.store.dispatch(LoadBooks());
    }
  }

  selectBook(id: string) {
    this.store.dispatch(LoadSelectedBook({ book: id }));
  }

  updatePage(page: PageEvent) {
    this.store.dispatch(UpdatePage({ page: page.pageIndex }));
    this.store.dispatch(LoadBooks())
  }
}
