import express from 'express';
import * as booksController from '../controllers/booksController';
import { validateRequest } from '../middleware/validation';
import { bookCreateValidator, bookUpdateValidator } from '../middleware/validators/bookValidator';
import { getAvailableBooksByIsbn } from '../middleware/isBookAvailable';

const router = express.Router();

router.get('/', booksController.getBooks);
router.get('/:id', booksController.getBookById);
router.post('/', validateRequest(bookCreateValidator), booksController.createBook);
router.put('/:id', validateRequest(bookUpdateValidator), booksController.updateBook);
router.delete('/:id', booksController.deleteBook);
router.get('/isbn/:isbn', booksController.getBooksByIsbn);
router.get('/available/:isbn', getAvailableBooksByIsbn);
// get by isbn from google books api
router.get('/google/:isbn', booksController.getBookByIsbnFromGoogle);

export default router;
