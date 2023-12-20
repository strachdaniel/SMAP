import express from "express";
import {
  deleteEmployeeCategory,
  getAllEmployeeCategories,
  updateEmployeeCategory,
  getEmployeeCategoryById,
  createEmployeeCategory,
} from "../controllers/EmployeeCategoryController";
import { get } from "http";

const router = express.Router();

router.get("/", getAllEmployeeCategories);
router.get("/:id", getEmployeeCategoryById);
router.post("/", createEmployeeCategory);
router.put("/:id", updateEmployeeCategory);
router.delete("/:id", deleteEmployeeCategory);

export default router;
