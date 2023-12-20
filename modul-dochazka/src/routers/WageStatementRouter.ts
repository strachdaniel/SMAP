import express from "express";
import {
  createWageStatement,
  deleteWageStatement,
  getAllWageStatement,
  getWageStatementById,
  updateWageStatement,
} from "../controllers/WageStatementController";

const router = express.Router();

router.get("/", getAllWageStatement);
router.get("/:id", getWageStatementById);
router.post("/", createWageStatement);
router.put("/:id", updateWageStatement);
router.delete("/:id", deleteWageStatement);

export default router;
