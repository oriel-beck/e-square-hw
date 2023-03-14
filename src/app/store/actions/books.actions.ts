import { createAction, props } from "@ngrx/store";
import type { Book } from "../models/book.model";

export const LoadBooks = createAction('Load Books');
export const LoadBooksSuccess = createAction('Load Books Success', props<{ books: Book[], maxResults: number }>());
export const LoadSelectedBook = createAction('Load Selected Book', props<{ book: string }>());
export const LoadSelectedBookSuccess = createAction('Load Selected Book Success', props<{ book: Book }>());
export const UnselectBook = createAction('Unselect Book');
export const UpdatePage = createAction('Update Page', props<{ page: number }>());
export const UpdateQuery = createAction('Update Query', props<{ query: string }>());
export const EmptySearch = createAction('Empty Search');