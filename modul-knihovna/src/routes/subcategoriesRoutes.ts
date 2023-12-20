import express from 'express';
import * as subcategoriesController from '../controllers/subcategoriesController';
import { validateRequest } from '../middleware/validation';
import { subcategoryCreateValidator, subcategoryUpdateValidator } from '../middleware/validators/subcategoriesValidator';

const router = express.Router();

router.get('/', subcategoriesController.getSubcategories);
router.get('/:id', subcategoriesController.getSubcategoryById);
router.post('/', validateRequest(subcategoryCreateValidator), subcategoriesController.createSubcategory);
router.put('/:id', validateRequest(subcategoryUpdateValidator), subcategoriesController.updateSubcategory);
router.delete('/:id', subcategoriesController.deleteSubcategory);

export default router;
