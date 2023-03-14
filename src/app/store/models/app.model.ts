import type { BooksState } from "../reducers/books.reducer";
import type { UserState } from "../reducers/user.reducer";

export interface AppState {
    books: BooksState;
    user: UserState;
}