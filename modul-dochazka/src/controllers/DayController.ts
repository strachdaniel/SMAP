import { Request, Response } from "express";
import { DaysDAO as DAO } from "../services/Basic DAO/Days";

const DayDAO = new DAO();

export const getAllDays = async (req: Request, res: Response) => {
  try {
    const data = await DayDAO.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDayById = async (req: Request, res: Response) => {
  try {
    const data = await DayDAO.findById(parseInt(req.params.id));
    if (!data) {
      res.status(404).json({ error: "Day not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDay = async (req: Request, res: Response) => {
  try {
    const data = await DayDAO.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDay = async (req: Request, res: Response) => {
  try {
    const data = await DayDAO.update(parseInt(req.params.id), req.body);

    if (!data) {
      res.status(404).json({ error: "Day not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDay = async (req: Request, res: Response) => {
  try {
    const result = await DayDAO.delete(parseInt(req.params.id));
    if (!result) {
      res.status(404).json({ error: "Day not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
