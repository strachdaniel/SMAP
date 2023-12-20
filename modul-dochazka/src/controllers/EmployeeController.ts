import { Request, Response } from "express";
import { EmployeeDAO as DAO } from "../services/Basic DAO/Employee";

const EmployeeDAO = new DAO();

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeDAO.findAll();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeDAO.findById(parseInt(req.params.id));
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json(employee);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyEmployeeInfo = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json(req.user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeDAO.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await EmployeeDAO.update(
      parseInt(req.params.id),
      req.body
    );

    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json(employee);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const result = await EmployeeDAO.delete(parseInt(req.params.id));
    if (!result) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
