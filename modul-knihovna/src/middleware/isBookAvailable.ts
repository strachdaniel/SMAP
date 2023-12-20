// check if book is available for borrowing = book is not borrowed

import { Book } from ".prisma/client";
import * as booksModel from '../models/booksModel';
import * as borrowsModel from '../models/borrowsModel';
import { convertToCamelCase } from "../utils/helpers";

export async function getAvailableBooksByIsbn(isbn: string): Promise<Book[]> {
  const books = await booksModel.getBooksByIsbn(isbn);
  // books is borrowed, when in borrows table there is a record with book_id = book.book_id and return_date is null
  // if there is no such record, then book is available
  const availableBooks = books.filter(async (book) => {
    const borrows = await borrowsModel.getBorrows({ book_id: book.book_id, returned_at: null });
    return borrows.length === 0;
  });

  return convertToCamelCase(availableBooks);
}
