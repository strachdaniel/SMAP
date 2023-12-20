import { Request, Response } from "express";
import { ContractDAO as DAO } from "../services/Basic DAO/Contract";

const ContractDAO = new DAO();

export const getAllContracts = async (req: Request, res: Response) => {
  try {
    const contracts = await ContractDAO.findAll();
    res.status(200).json(contracts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getContractById = async (req: Request, res: Response) => {
  try {
    const contract = await ContractDAO.findById(parseInt(req.params.id));
    if (!contract) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.status(200).json(contract);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createContract = async (req: Request, res: Response) => {
  try {
    const contract = await ContractDAO.create(req.body);
    res.status(201).json(contract);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    const contract = await ContractDAO.update(
      parseInt(req.params.id),
      req.body
    );

    if (!contract) {
      res.status(404).json({ error: "Contract not found" });
    } else {
      res.status(200).json(contract);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const result = await ContractDAO.delete(parseInt(req.params.id));
    if (!result) {
      res.status(404).json({ error: "Contract not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
