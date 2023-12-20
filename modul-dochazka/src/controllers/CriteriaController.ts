import { Request, Response } from "express";
import { CriteriaDAO as DAO } from "../services/Basic DAO/Criteria";
import EmployeeCategoryDAO from "../services/Basic DAO/EmployeeCategory";

const CriteriaDAO = new DAO();

export const getAllCriteria = async (req: Request, res: Response) => {
  try {
    const data = await CriteriaDAO.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCriteriaById = async (req: Request, res: Response) => {
  try {
    const data = await CriteriaDAO.findById(parseInt(req.params.id));
    if (!data) {
      res.status(404).json({ error: "Criteria not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCriteria = async (req: Request, res: Response) => {
  try {
    const data = await CriteriaDAO.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCriteria = async (req: Request, res: Response) => {
  try {
    const data = await CriteriaDAO.update(parseInt(req.params.id), req.body);

    if (!data) {
      res.status(404).json({ error: "Criteria not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCriteria = async (req: Request, res: Response) => {
  try {
    const result = await CriteriaDAO.delete(parseInt(req.params.id));
    if (!result) {
      res.status(404).json({ error: "Criteria not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCriteriaByContract = async (req: Request, res: Response) => {
  //req should include contract_id
  const contract_id = parseInt(req.params.id);
  console.log(contract_id);

  //get employee_category_id from contract
  const { employee_category_id } = await EmployeeCategoryDAO.findById(
    contract_id
  );

  const criteria = await CriteriaDAO.findByEmployeeCategory(
    employee_category_id
  );

  res.status(200).json(criteria);
};
