import express from 'express';
import * as borrowsController from '../controllers/borrowsController';
import { validateRequest } from '../middleware/validation';
import { borrowCreateValidator, borrowUpdateValidator } from '../middleware/validators/borrowsValidator';

const router = express.Router();

router.get('/', borrowsController.getBorrows);
router.get('/:id', borrowsController.getBorrowById);
router.post('/', validateRequest(borrowCreateValidator), borrowsController.createBorrow);
router.put('/:id', validateRequest(borrowUpdateValidator), borrowsController.updateBorrow);
router.delete('/:id', borrowsController.deleteBorrow);
router.post('/:id/return', borrowsController.returnBorrow);

export default router;

