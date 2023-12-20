import { Request, Response } from 'express';
import * as pairedCategoriesModel from '../models/pairedCategoriesModel';
import { PairedCategoryFilter } from '../models/pairedCategoriesModel';
import { convertToCamelCase, convertToSnakeCase, parseQueryToFilter } from '../utils/helpers';

const defaultPairedCategoryFilter: PairedCategoryFilter = {
  category_id: 0,
  subcategory_id: 0,
};

export const getPairedCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: PairedCategoryFilter = parseQueryToFilter<PairedCategoryFilter>(req.query, defaultPairedCategoryFilter);
    const pairedCategories = await pairedCategoriesModel.getPairedCategories(filter);

    res.status(200).json(convertToCamelCase(pairedCategories));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching paired categories.' });  
  }
};

export const getPairedCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid paired category id.' });
      return;
    }

    const pairedCategory = await pairedCategoriesModel.getPairedCategoryById(id);

    if (pairedCategory) {
      res.status(200).json(convertToCamelCase(pairedCategory));
    } else {
      res.status(404).json({ error: 'Paired category not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the paired category.' });
  }
};

export const createPairedCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = convertToSnakeCase(req.body);
    const newPairedCategory = await pairedCategoriesModel.createPairedCategory(body);
    res.status(201).json(convertToCamelCase(newPairedCategory));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the paired category.' });
  }
};

export const updatePairedCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid paired category id.' });
      return;
    }

    const body = convertToSnakeCase(req.body);
    const updatedPairedCategory = await pairedCategoriesModel.updatePairedCategory(id, body);

    if (updatedPairedCategory) {
      res.status(200).json(convertToCamelCase(updatedPairedCategory));
    } else {
      res.status(404).json({ error: 'Paired category not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the paired category.' });
  }
};

export const deletePairedCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid paired category id.' });
      return;
    }

    const pairedCategory = await pairedCategoriesModel.getPairedCategoryById(id);

    if (pairedCategory) {
      await pairedCategoriesModel.deletePairedCategory(id);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Paired category not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the paired category.' });
  }
};
