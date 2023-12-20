import express from 'express';
import * as categoriesController from '../controllers/categoriesController';
import { validateRequest } from '../middleware/validation';
import { categoryCreateValidator, categoryUpdateValidator } from '../middleware/validators/categoriesValidator';

const router = express.Router();

router.get('/', categoriesController.getCategories);
router.get('/:id', categoriesController.getCategoryById);
router.post('/', validateRequest(categoryCreateValidator), categoriesController.createCategory);
router.put('/:id', validateRequest(categoryUpdateValidator), categoriesController.updateCategory);
router.delete('/:id', categoriesController.deleteCategory);

export default router;
