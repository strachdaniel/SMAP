import express from "express";
import {
  createDayliCriteria,
  deleteDayliCriteria,
  getAllDayliCriterias,
  getDayliCriteriaByDayId,
  getDayliCriteriaById,
  updateDayliCriteria,
} from "../controllers/DayliCriteriaController";

const router = express.Router();

router.get("/", getAllDayliCriterias);
router.get("/:id", getDayliCriteriaById);
router.get("/day/:id", getDayliCriteriaByDayId);
router.post("/", createDayliCriteria);
router.put("/:id", updateDayliCriteria);
router.delete("/:id", deleteDayliCriteria);

export default router;
