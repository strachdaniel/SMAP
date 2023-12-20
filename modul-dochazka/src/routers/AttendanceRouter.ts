import express from "express";
import {
  createAttendance,
  deleteAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
} from "../controllers/AttendanceController";
import { isAuth } from "../middleware/isAuth";
import validateAttendanceData from "../validators/AttendanceSaveValidator";

const router = express.Router();

router.get("/", getAllAttendances);
router.get("/:id", getAttendanceById);
router.post("/", validateAttendanceData, createAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

router.post("/save", isAuth, createAttendance);

export default router;
