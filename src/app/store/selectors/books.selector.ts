import { createSelector } from "@ngrx/store";

import type { AppState } from "../models/app.model";

export const selectBooks = (state: AppState) => state.books;
export const selectBooksArray = createSelector(
    selectBooks,
    (state) => state.books
);

export const selectSelectedBook = createSelector(
    selectBooks,
    (state) => state.selectedBook
);

export const selectBooksMaxResults = createSelector(
    selectBooks,
    (state) => state.maxResults
);

export const selectQuery = createSelector(
    selectBooks,
    (state) => state.query
);

export const selectPage = createSelector(
    selectBooks,
    (state) => state.page
)
