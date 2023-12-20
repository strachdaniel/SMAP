import { Request, Response } from "express";
import { DayliCriteriaDAO as DAO } from "../services/Basic DAO/DayliCriteria";

const DayliCriteriaDAO = new DAO();

export const getAllDayliCriterias = async (req: Request, res: Response) => {
  try {
    const data = await DayliCriteriaDAO.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDayliCriteriaById = async (req: Request, res: Response) => {
  try {
    const data = await DayliCriteriaDAO.findById(parseInt(req.params.id));
    if (!data) {
      res.status(404).json({ error: "Record not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDayliCriteriaByDayId = async (req: Request, res: Response) => {
  try {
    const data = await DayliCriteriaDAO.findByDayId(parseInt(req.params.id));
    if (!data) {
      res.status(404).json({ error: "Record not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createDayliCriteria = async (req: Request, res: Response) => {
  try {
    const data = await DayliCriteriaDAO.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDayliCriteria = async (req: Request, res: Response) => {
  try {
    const data = await DayliCriteriaDAO.update(
      parseInt(req.params.id),
      req.body
    );

    if (!data) {
      res.status(404).json({ error: "Record not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDayliCriteria = async (req: Request, res: Response) => {
  try {
    const result = await DayliCriteriaDAO.delete(parseInt(req.params.id));
    if (!result) {
      res.status(404).json({ error: "Record not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
