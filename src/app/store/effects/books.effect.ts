import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoadBooks, LoadBooksSuccess, LoadSelectedBook, LoadSelectedBookSuccess } from "../actions/books.actions";
import { HttpClient } from '@angular/common/http'
import { EMPTY, catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectPage, selectQuery } from "../selectors/books.selector";

import type { Book, GoogleBooksResponse } from "../models/book.model";
import type { AppState } from "../models/app.model";

@Injectable()
export class BookEffects {
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<AppState>
    ) { }

    getBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadBooks),
            withLatestFrom(this.store.select(selectQuery)),
            withLatestFrom(this.store.select(selectPage)),
            switchMap(([[_, query], page]) => {
                const queryParams = new URLSearchParams({
                    q: query,
                    maxResults: '20',
                    startIndex: (page * 20).toString()
                })
                return this.http.get<GoogleBooksResponse>(`https://www.googleapis.com/books/v1/volumes?${queryParams.toString()}`)
            }),
            map((res) => LoadBooksSuccess({ books: res.items, maxResults: res.totalItems })),
            catchError(() => of(LoadBooksSuccess({ books: [], maxResults: 0 })))
        )
    )

    selectBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadSelectedBook),
            switchMap(({ book }) => this.http.get<Book>(`https://www.googleapis.com/books/v1/volumes/${book}`)),
            map((book) => LoadSelectedBookSuccess({ book })),
            catchError(() => EMPTY)
        )
    )
}