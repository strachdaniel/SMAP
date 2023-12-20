import axios from 'axios';

interface Book {
  title: string;
  author: string;
  isbn: string;
}

export async function fetchBookByIsbnFromGoogle(
  isbn: string
): Promise<Book[]> {
  console.log('fetchBookByIsbnFromGoogle');

  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error('Error fetching book');
  }

  if (response.data.totalItems > 0) {
    const fetchedBooks = response.data.items;

    const books: Book[] = [];
    fetchedBooks.map((book: any) => {
      const fetchedBook: Book = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors.join(', '),
        isbn: book.volumeInfo.industryIdentifiers[0].identifier,
      };

      books.push(fetchedBook);
    });

    return books;
  } else {
    throw new Error('No book found');
  }
};
