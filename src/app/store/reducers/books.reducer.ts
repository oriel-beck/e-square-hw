import { createReducer, on } from '@ngrx/store';
import { EmptySearch, LoadBooks, LoadBooksSuccess, LoadSelectedBook, LoadSelectedBookSuccess, UnselectBook, UpdatePage, UpdateQuery } from '../actions/books.actions';
import type { Book } from '../models/book.model';

export interface BooksState {
    books: ReadonlyArray<Book>;
    selectedBook: Book | null;
    maxResults: number;
    page: number;
    query: string;
}

export const initialState: BooksState = {
    books: [],
    selectedBook: null,
    maxResults: 0,
    page: 0,
    query: ''
};

export const booksReducer = createReducer(
    initialState,
    on(LoadBooks, (state) => state),
    on(LoadBooksSuccess, (state, { books, maxResults }) => ({ ...state, books, maxResults })),
    on(LoadSelectedBook, (state) => state),
    on(LoadSelectedBookSuccess, (state, { book }) => ({ ...state, selectedBook: book })),
    on(UnselectBook, (state) => ({ ...state, selectedBook: null })),
    on(UpdatePage, (state, { page }) => ({ ...state, page })),
    on(UpdateQuery, (state, { query }) => ({ ...state, query, page: 0 })),
    on(EmptySearch, () => initialState)
);