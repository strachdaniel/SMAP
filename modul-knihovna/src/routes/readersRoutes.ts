import express from 'express';
import * as readersController from '../controllers/readersController';
import { validateRequest } from '../middleware/validation';
import { readerCreateValidator, readerUpdateValidator } from '../middleware/validators/readersValidator';

const router = express.Router();

router.get('/', readersController.getReaders);
router.get('/:id', readersController.getReaderById);
router.post('/', validateRequest(readerCreateValidator), readersController.createReader);
router.put('/:id', validateRequest(readerUpdateValidator), readersController.updateReader);
router.delete('/:id', readersController.deleteReader);

export default router;
