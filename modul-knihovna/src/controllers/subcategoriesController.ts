import { Request, Response } from 'express';
import * as subcategoriesModel from '../models/subcategoriesModel';
import { SubcategoryFilter } from '../models/subcategoriesModel';
import { convertToCamelCase, convertToSnakeCase, parseQueryToFilter } from '../utils/helpers';

const defaultSubcategoryFilter: SubcategoryFilter = {
  name: '',
};

export const getSubcategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: SubcategoryFilter = parseQueryToFilter<SubcategoryFilter>(req.query, defaultSubcategoryFilter);
    const subcategories = await subcategoriesModel.getSubcategories(filter);

    res.status(200).json(convertToCamelCase(subcategories));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching subcategories.' });
  }
};

export const getSubcategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid subcategory id.' });
      return;
    }

    const subcategory = await subcategoriesModel.getSubcategoryById(id);

    if (subcategory) {
      res.status(200).json(convertToCamelCase(subcategory));
    } else {
      res.status(404).json({ error: 'Subcategory not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the subcategory.' });
  }
};

export const createSubcategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = convertToSnakeCase(req.body);
    const newSubcategory = await subcategoriesModel.createSubcategory(body);

    res.status(201).json(convertToCamelCase(newSubcategory));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the subcategory.' });
  }
};

export const updateSubcategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid subcategory id.' });
      return;
    }

    const body = convertToSnakeCase(req.body);
    const updatedSubcategory = await subcategoriesModel.updateSubcategory(id, body);

    if (updatedSubcategory) {
      res.status(200).json(convertToCamelCase(updatedSubcategory));
    } else {
      res.status(404).json({ error: 'Subcategory not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the subcategory.' });
  }
};

export const deleteSubcategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid subcategory id.' });
      return;
    }

    const subcategory = await subcategoriesModel.getSubcategoryById(id);

    if (subcategory) {
      await subcategoriesModel.deleteSubcategory(id);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Subcategory not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the subcategory.' });
  }
};
