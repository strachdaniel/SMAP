import express from "express";
import {
  createEmploymentType,
  deleteEmploymentType,
  getAllEmploymentTypes,
  getEmploymentTypeById,
  updateEmploymentType,
} from "../controllers/EmploymentTypeController";

const router = express.Router();

router.get("/", getAllEmploymentTypes);
router.get("/:id", getEmploymentTypeById);
router.post("/", createEmploymentType);
router.put("/:id", updateEmploymentType);
router.delete("/:id", deleteEmploymentType);

export default router;
