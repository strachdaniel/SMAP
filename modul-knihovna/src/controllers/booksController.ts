import { Request, Response } from 'express';
import * as booksModel from '../models/booksModel';
import { BookFilter } from '../models/booksModel';
import {
  DefaultValues,
  convertToCamelCase,
  convertToSnakeCase,
  parseQueryToFilter,
} from '../utils/helpers';
import { fetchBookByIsbnFromGoogle } from '../middleware/googleBooks';

const defaultBookFilter: DefaultValues<BookFilter> = {
  isbn: '',
  title: '',
  author: '',
  category_id: 0,
  subcategory_id: 0,
  offset: 0,
  limit: 50,
};

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: BookFilter = parseQueryToFilter<BookFilter>(
      req.query,
      defaultBookFilter
    );
    const books = await booksModel.getBooks(filter);

    res.status(200).json(convertToCamelCase(books));
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: 'An error occurred while fetching books.' });
  }
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid book id.' });
      return;
    }

    const book = await booksModel.getBookById(id);

    if (book) {
      res.status(200).json(convertToCamelCase(book));
    } else {
      res.status(404).json({ error: 'Book not found.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the book.' });
  }
};

export const getBooksByIsbn = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const isbn = req.params.isbn;

    if (isbn === '') {
      res.status(400).json({ error: 'Invalid book isbn.' });
      return;
    }

    const book = await booksModel.getBooksByIsbn(isbn);

    if (book) {
      res.status(200).json(convertToCamelCase(book));
    } else {
      res.status(404).json({ error: 'Book not found.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the book.' });
  }
};

export const getBookByIsbnFromGoogle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const isbn = req.params.isbn;

    if (isbn === '') {
      res.status(400).json({ error: 'Invalid book isbn.' });
      return;
    }

    const book = await fetchBookByIsbnFromGoogle(isbn);

    if (book) {
      res.status(200).json(convertToCamelCase(book));
    } else {
      res.status(404).json({ error: 'Book not found.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the book.' });
  }
};

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const body = convertToSnakeCase(req.body);
    console.log(body);
    
    const newBook = await booksModel.createBook(body);
    res.status(201).json(convertToCamelCase(newBook));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ error: 'An error occurred while creating the book.' });
  }
};

export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid book id.' });
      return;
    }

    const body = convertToSnakeCase(req.body);
    const updatedBook = await booksModel.updateBook(id, body);

    if (updatedBook) {
      res.status(200).json(convertToCamelCase(updatedBook));
    } else {
      res.status(404).json({ error: 'Book not found.' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the book.' });
  }
};

export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid book id.' });
      return;
    }

    const book = await booksModel.getBookById(id);

    if (book) {
      await booksModel.deleteBook(id);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Book not found.' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the book.' });
  }
};
