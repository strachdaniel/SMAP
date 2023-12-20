import express from "express";
import {
  createAttendanceSheet,
  deleteAttendanceSheet,
  getAllAttendanceSheets,
  getAttendanceSheetById,
  updateAttendanceSheet,
} from "../controllers/AttendanceSheetController";

const router = express.Router();

router.get("/", getAllAttendanceSheets);
router.get("/:id", getAttendanceSheetById);
router.post("/", createAttendanceSheet);
router.put("/:id", updateAttendanceSheet);
router.delete("/:id", deleteAttendanceSheet);

export default router;
