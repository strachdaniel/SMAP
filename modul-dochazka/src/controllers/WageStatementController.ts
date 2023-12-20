import { Request, Response } from "express";
import { WageStatementDAO } from "../services/Basic DAO/WageStatement";

export const getAllWageStatement = async (req: Request, res: Response) => {
  try {
    const wageStatements = await WageStatementDAO.findAll();
    res.status(200).json(wageStatements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWageStatementById = async (req: Request, res: Response) => {
  try {
    const wageStatement = await WageStatementDAO.findById(
      parseInt(req.params.id)
    );
    if (!wageStatement) {
      res.status(404).json({ message: "Wage statement not found" });
      return;
    }
    res.status(200).json(wageStatement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createWageStatement = async (req: Request, res: Response) => {
  try {
    req.body.valid_from = new Date(req.body.valid_from);
    req.body.valid_to = new Date(req.body.valid_to);
    const wageStatement = await WageStatementDAO.create(req.body);
    res.status(201).json(wageStatement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateWageStatement = async (req: Request, res: Response) => {
  try {
    const wageStatement = await WageStatementDAO.findById(
      parseInt(req.params.id)
    );
    if (!wageStatement) {
      res.status(404).json({ message: "Wage statement not found" });
      return;
    }

    const updatedWageStatement = await WageStatementDAO.update(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(updatedWageStatement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteWageStatement = async (req: Request, res: Response) => {
  try {
    const wageStatement = await WageStatementDAO.delete(
      parseInt(req.params.id)
    );
    if (!wageStatement) {
      res.status(404).json({ message: "Wage statement not found" });
      return;
    } else {
      res.status(200).json({ message: "Wage statement deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
