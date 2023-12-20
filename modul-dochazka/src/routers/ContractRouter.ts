import express from "express";
import {
  deleteContract,
  getAllContracts,
  getContractById,
  updateContract,
  createContract,
} from "../controllers/ContractController";

const router = express.Router();

router.get("/", getAllContracts);
router.get("/:id", getContractById);
router.post("/", createContract);
router.put("/:id", updateContract);
router.delete("/:id", deleteContract);

export default router;
