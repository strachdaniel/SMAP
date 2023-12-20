import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validationRules = [
  body("attendance_id").isInt(),
  body("employee_id").isInt(),
  body("date").isDate(),
  body("payroll").optional().isString(),
  body("vacation_free_days").optional().isInt(),
  body("vacation_taken_days").optional().isInt(),
  body("sickdays").optional().isInt(),
  body("status").isString(),
  body("created_at").isDate(),
  body("updated_at").isDate(),
];

const runAttendanceValidation = (attendnace) => {
  const errors = validationResult(attendnace);
  if (!errors.isEmpty()) {
    throw new Error("Validation failed!");
  } else {
    return true;
  }
};

export default runAttendanceValidation;
