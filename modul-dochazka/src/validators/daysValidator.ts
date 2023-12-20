import { body, validationResult } from "express-validator";

const validationRules = [
  body("day_id").isInt().isString(),
  body("attendance_sheet_id").isInt(),
  body("date").isDate(),
  body("from").isDate().optional(),
  body("to").isDate().optional(),
  body("note").optional().isString(),
];

const runDaysValidation = (attendance) => {
  const errors = validationResult(attendance);
  if (!errors.isEmpty()) {
    throw new Error("Validation failed!");
  } else {
    return true;
  }
};

export default runDaysValidation;
