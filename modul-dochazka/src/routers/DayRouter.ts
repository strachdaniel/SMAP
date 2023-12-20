import express from "express";
import { createDay, deleteDay, getAllDays, getDayById, updateDay } from "../controllers/DayController";


const router = express.Router();

router.get("/", getAllDays);
router.get("/:id", getDayById);
router.post("/", createDay);
router.put("/:id", updateDay);
router.delete("/:id", deleteDay);

export default router;
