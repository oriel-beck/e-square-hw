import { createReducer, on } from '@ngrx/store';
import { AddBook, ClearBooks, Login, Logout, RemoveBook } from '../actions/user.actions';
import { UpdatePage } from '../actions/user.actions';

import type { Book } from '../models/book.model';

export interface UserState {
    username?: string;
    wishlist: Book[];
    page: number;
}
export const initialState: UserState = {
    wishlist: [],
    page: 0
};

export const userReducer = createReducer(
    initialState,
    on(Login, (state, { username }) => ({ ...state, username })),
    on(Logout, () => initialState),
    on(AddBook, (state, { book }) => ({ ...state, wishlist: [...state.wishlist].concat([book]) })),
    on(RemoveBook, (state, { book }) => ({ ...state, wishlist: state.wishlist.filter((wishedBook) => wishedBook.id != book) })),
    on(ClearBooks, (state) => ({ ...state, wishlist: [] })),
    on(UpdatePage, (state, { page }) => ({ ...state, page }))
);