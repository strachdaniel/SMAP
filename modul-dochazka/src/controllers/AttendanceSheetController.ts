import { Request, Response } from "express";
import { AttendanceSheetDAO as DAO } from "../services/Basic DAO/AttendanceSheet";

const AttendanceSheetDAO = new DAO();

export const getAllAttendanceSheets = async (req: Request, res: Response) => {
  try {
    const data = await AttendanceSheetDAO.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAttendanceSheetById = async (req: Request, res: Response) => {
  try {
    const data = await AttendanceSheetDAO.findById(parseInt(req.params.id));
    if (!data) {
      res.status(404).json({ error: "Attendance Sheet not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAttendanceSheet = async (req: Request, res: Response) => {
  try {
    const data = await AttendanceSheetDAO.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAttendanceSheet = async (req: Request, res: Response) => {
  try {
    const data = await AttendanceSheetDAO.update(
      parseInt(req.params.id),
      req.body
    );

    if (!data) {
      res.status(404).json({ error: "Attendance sheet not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAttendanceSheet = async (req: Request, res: Response) => {
  try {
    const result = await AttendanceSheetDAO.delete(parseInt(req.params.id));
    if (!result) {
      res.status(404).json({ error: "Attendance Sheet not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
