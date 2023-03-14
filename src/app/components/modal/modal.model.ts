import type { Book } from "../../store/models/book.model";

export interface ModalData {
    book: Book;
    actionLabel: string;
}