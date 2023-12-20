import express from "express";
import {
  createCriteria,
  deleteCriteria,
  getAllCriteria,
  getCriteriaByContract,
  getCriteriaById,
  updateCriteria,
} from "../controllers/CriteriaController";

const router = express.Router();

router.get("/", getAllCriteria);
router.get("/:id", getCriteriaById);
router.get("/contract/:id", getCriteriaByContract);
router.post("/", createCriteria);
router.put("/:id", updateCriteria);
router.delete("/:id", deleteCriteria);

export default router;
