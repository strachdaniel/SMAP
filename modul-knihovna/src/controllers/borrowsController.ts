import { Request, Response } from 'express';
import * as borrowsModel from '../models/borrowsModel';
import { DefaultValues, convertToCamelCase, convertToSnakeCase, parseQueryToFilter } from '../utils/helpers';
import { BorrowFilter } from '../models/borrowsModel';

const defaultBorrowFilter: DefaultValues<BorrowFilter> = {
  reader_id: 0,
  book_id: 0,
  returned_before: '',
  returned_after: '',
  returned_at: '',
  offset: 0,
  limit: 50,
};

export const getBorrows = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: BorrowFilter = parseQueryToFilter<BorrowFilter>(req.query, defaultBorrowFilter);
    const borrows = await borrowsModel.getBorrows(filter);

    res.status(200).json(convertToCamelCase(borrows));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching borrows.' });
  }
};

export const getBorrowById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid borrow id.' });
      return;
    }

    const borrow = await borrowsModel.getBorrowById(id);

    if (borrow) {
      res.status(200).json(convertToCamelCase(borrow));
    } else {
      res.status(404).json({ error: 'Borrow not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the borrow.' });
  }
};

export const createBorrow = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = convertToSnakeCase(req.body);
    const newBorrow = await borrowsModel.createBorrow(body);
    res.status(201).json(convertToCamelCase(newBorrow));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the borrow.' });
  }
};

export const updateBorrow = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid borrow id.' });
      return;
    }

    const body = convertToSnakeCase(req.body);
    const updatedBorrow = await borrowsModel.updateBorrow(id, body);

    if (updateBorrow) {
      res.status(200).json(convertToCamelCase(updatedBorrow));
    } else {
      res.status(404).json({ error: 'Borrow not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the borrow.' });
  }
};

export const deleteBorrow = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid borrow id.' });
      return;
    }

    const borrow = await borrowsModel.getBorrowById(id);

    if (borrow) {
      await borrowsModel.deleteBorrow(id);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Borrow not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the borrow.' });
  }
};

export const returnBorrow = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid borrow id.' });
      return;
    }

    const borrow = await borrowsModel.getBorrowById(id);

    if (borrow) {
      await borrowsModel.returnBorrow(id);
      res.status(200).json(convertToCamelCase(borrow));
    } else {
      res.status(404).json({ error: 'Borrow not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while returning the borrow.' });
  }
};
