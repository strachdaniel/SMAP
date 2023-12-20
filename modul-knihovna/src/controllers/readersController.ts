import { Request, Response } from 'express';
import * as readersModel from '../models/readersModel';
import { ReaderFilter } from '../models/readersModel';
import { convertToCamelCase, convertToSnakeCase, parseQueryToFilter } from '../utils/helpers';

const defaultReaderFilter: ReaderFilter = {
  reader_id: 0,
  user_id: 0,
};

export const getReaders = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: ReaderFilter = parseQueryToFilter<ReaderFilter>(req.query, defaultReaderFilter);
    const readers = await readersModel.getReaders(filter);

    res.status(200).json(convertToCamelCase(readers)); 
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching readers.' });
  }
};

export const getReaderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid reader id.' });
      return;
    }

    const reader = await readersModel.getReaderById(id);

    if (reader) {
      res.status(200).json(convertToCamelCase(reader));
    } else {
      res.status(404).json({ error: 'Reader not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the reader.' });
  }
};

export const createReader = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = convertToSnakeCase(req.body);
    const newReader = await readersModel.createReader(body);

    res.status(201).json(convertToCamelCase(newReader));
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the reader.' });
  }
};

export const updateReader = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid reader id.' });
      return;
    }

    const body = convertToSnakeCase(req.body);
    const updatedReader = await readersModel.updateReader(id, body);

    if (updatedReader) {
      res.status(200).json(convertToCamelCase(updatedReader));
    } else {
      res.status(404).json({ error: 'Reader not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the reader.' });
  }
};

export const deleteReader = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid reader id.' });
      return;
    }

    const reader = await readersModel.getReaderById(id);

    if (reader) {
      await readersModel.deleteReader(id);
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Reader not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the reader.' });
  }
};
