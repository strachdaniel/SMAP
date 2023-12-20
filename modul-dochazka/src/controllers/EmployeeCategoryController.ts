import { Request, Response } from "express";
import EmployeeCategoryDAO from "../services/Basic DAO/EmployeeCategory";

export const getAllEmployeeCategories = async (req: Request, res: Response) => {
  try {
    const employeeCategories = await EmployeeCategoryDAO.findAll();
    res.status(200).json(employeeCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEmployeeCategoryById = async (req: Request, res: Response) => {
  try {
    const employeeCategory = await EmployeeCategoryDAO.findById(
      parseInt(req.params.id)
    );
    if (!employeeCategory) {
      res.status(404).json({ message: "Employee category not found" });
      return;
    }
    res.status(200).json(employeeCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createEmployeeCategory = async (req: Request, res: Response) => {
  try {
    const employeeCategory = await EmployeeCategoryDAO.create(req.body);
    res.status(201).json(employeeCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateEmployeeCategory = async (req: Request, res: Response) => {
  try {
    const employeeCategory = await EmployeeCategoryDAO.findById(
      parseInt(req.params.id)
    );
    if (!employeeCategory) {
      res.status(404).json({ message: "Employee category not found" });
      return;
    }

    const updatedemployeeCategory = await EmployeeCategoryDAO.update(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(updatedemployeeCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEmployeeCategory = async (req: Request, res: Response) => {
  try {
    const employeeCategory = await EmployeeCategoryDAO.delete(
      parseInt(req.params.id)
    );
    if (!employeeCategory) {
      res.status(404).json({ message: "Employee category not found" });
      return;
    } else {
      res.status(200).json({ message: "Employee category deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
