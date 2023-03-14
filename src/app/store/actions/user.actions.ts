import { createAction, props } from '@ngrx/store';
import type { Book } from '../models/book.model';

export const Login = createAction('Login', props<{ username: string }>());
export const Logout = createAction('Logout');
export const AddBook = createAction('Add Book', props<{ book: Book }>());
export const RemoveBook = createAction('Remove Book', props<{ book: string }>());
export const ClearBooks = createAction('Clear Books');
export const UpdatePage = createAction('Update Page', props<{ page: number }>());