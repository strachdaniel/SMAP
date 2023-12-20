import { Request, Response } from "express";
import { AttendanceDAO as DAO } from "../services/Basic DAO/Attenndance";
import AttendanceService from "../services/AttendanceEditService";

const AttendanceDAO = new DAO();
const { saveAttendance } = AttendanceService();

export const getAllAttendances = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const employee_id = parseInt(req.user.profile.employee_id as string);
    console.log(employee_id);

    const data = await AttendanceDAO.findAllByEmployeeId(employee_id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: err.message });
  }
};

export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const data = await AttendanceDAO.findById(parseInt(req.params.id));
    if (!data) {
      res.status(404).json({ error: "Attendance not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const data = await AttendanceDAO.update(parseInt(req.params.id), req.body);

    if (!data) {
      res.status(404).json({ error: "Attendance not found" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const result = await AttendanceDAO.delete(parseInt(req.params.id));
    if (!result) {
      res.status(404).json({ error: "Contract not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAttendance = async (req: Request, res: Response) => {
  try {
    const data = await saveAttendance(req.body, req.user);
    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(400).json({ error: error.message });
  }
};
