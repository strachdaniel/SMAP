import express from 'express';
import * as pairedCategoriesController from '../controllers/pairedCategoriesController';
import { validateRequest } from '../middleware/validation';
import { pairedCategoryCreateValidator, pairedCategoryUpdateValidator } from '../middleware/validators/pairedCategoriesValidator';

const router = express.Router();

router.get('/', pairedCategoriesController.getPairedCategories);
router.get('/:id', pairedCategoriesController.getPairedCategoryById);
router.post('/', validateRequest(pairedCategoryCreateValidator), pairedCategoriesController.createPairedCategory);
router.put('/:id', validateRequest(pairedCategoryUpdateValidator), pairedCategoriesController.updatePairedCategory);
router.delete('/:id', pairedCategoriesController.deletePairedCategory);

export default router;
