import { Request, Response } from 'express';
import * as categoriesModel from '../models/categoriesModel';
import { convertToCamelCase, convertToSnakeCase, parseQueryToFilter } from '../utils/helpers';
import { CategoryFilter } from '../models/categoriesModel';

const defaultCategoryFilter: CategoryFilter = {
  name: '',
};

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: CategoryFilter = parseQueryToFilter<CategoryFilter>(req.query, defaultCategoryFilter);
    const categories = await categoriesModel.getCategories(filter);

    res.status(200).json(convertToCamelCase(categories));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching categories.' });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid category id.' });
      return;
    }

    const category = await categoriesModel.getCategoryById(id);

    if (category) {
      res.status(200).json(convertToCamelCase(category));
    } else {
      res.status(404).json({ error: 'Category not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the category.' });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = convertToSnakeCase(req.body);
    const newCategory = await categoriesModel.createCategory(body);
    res.status(201).json(convertToCamelCase(newCategory));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the category.' });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid category id.' });
      return;
    }

    const body = convertToSnakeCase(req.body);
    const updatedCategory = await categoriesModel.updateCategory(id, body);

    if (updatedCategory) {
      res.status(200).json(convertToCamelCase(updatedCategory));
    } else {
      res.status(404).json({ error: 'Category not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the category.' });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid category id.' });
      return;
    }

    const category = await categoriesModel.deleteCategory(id);

    if (category) {
      await categoriesModel.deleteCategory(id);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Category not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the category.' });
  }
};
