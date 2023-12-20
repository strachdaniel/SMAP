import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getMyEmployeeInfo,
} from "../controllers/EmployeeController";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get("/", getAllEmployees);
router.get("/my-info", isAuth, getMyEmployeeInfo);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
