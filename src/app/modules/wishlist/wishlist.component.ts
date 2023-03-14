import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, map, withLatestFrom } from 'rxjs';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoadSelectedBook, UnselectBook } from '../../store/actions/books.actions';
import { RemoveBook, UpdatePage } from '../../store/actions/user.actions';
import { selectSelectedBook } from '../../store/selectors/books.selector';
import { selectUsername, selectWishlist, selectWishlistLength, selectPage } from '../../store/selectors/user.selector';

import type { PageEvent } from '@angular/material/paginator';
import type { AppState } from '../../store/models/app.model';
import type { Book } from '../../store/models/book.model';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {
  username$ = this.store.select(selectUsername);
  pageIndex$ = this.store.select(selectPage);
  wishlist$ = this.store.select(selectPage).pipe(
    withLatestFrom(this.store.select(selectWishlist)),
    map(([page, books]) => [...books].splice(page * 20,(page + 1) * 20))
  );
  wishlistLength$ = this.store.select(selectWishlistLength);
  selectedBook$ = this.store.select(selectSelectedBook);
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
            data: { book, actionLabel: 'Remove from Wishlist' }
          });

          const wishSub = ref.componentInstance.actionTriggered.subscribe({
            next: (book: Book) => {
              this.store.dispatch(RemoveBook({ book: book.id }))
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

  selectBook(id: string) {
    this.store.dispatch(LoadSelectedBook({ book: id }));
  }


  updatePage(page: PageEvent) {
    this.store.dispatch(UpdatePage({ page: page.pageIndex }));
  }
}
