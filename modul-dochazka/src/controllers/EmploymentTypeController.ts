import { Request, Response } from "express";
import EmploymentTypeDAO from "../services/Basic DAO/EmploymentType";

export const getAllEmploymentTypes = async (req: Request, res: Response) => {
  try {
    const employmentTypes = await EmploymentTypeDAO.findAll();
    res.status(200).json(employmentTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEmploymentTypeById = async (req: Request, res: Response) => {
  try {
    const employmentType = await EmploymentTypeDAO.findById(
      parseInt(req.params.id)
    );
    if (!employmentType) {
      res.status(404).json({ message: "Employment type not found" });
      return;
    }
    res.status(200).json(employmentType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEmploymentType = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const employmentType = await EmploymentTypeDAO.create(req.body);
    res.status(201).json(employmentType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateEmploymentType = async (req: Request, res: Response) => {
  try {
    const employmentType = await EmploymentTypeDAO.findById(
      parseInt(req.params.id)
    );
    if (!employmentType) {
      res.status(404).json({ message: "Employment type not found" });
      return;
    }

    const updatedEmploymentType = await EmploymentTypeDAO.update(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(updatedEmploymentType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEmploymentType = async (req: Request, res: Response) => {
  try {
    const employmentType = await EmploymentTypeDAO.delete(
      parseInt(req.params.id)
    );
    if (!employmentType) {
      res.status(404).json({ message: "Employment type not found" });
      return;
    } else {
      res.status(200).json({ message: "Employment type deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
