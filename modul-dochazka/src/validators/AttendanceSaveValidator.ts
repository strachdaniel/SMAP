const { check, validationResult } = require("express-validator");

const validateAttendanceData = [
  check("attendance_id").exists().isInt(),
  check("attendance_sheets").exists().isArray(),
  check("attendance_sheets.*.attendance_sheet_id").exists().isInt(),
  check("attendance_sheets.*.contract_id").exists().isInt(),
  check("attendance_sheets.*.days").exists().isArray(),
  check("attendance_sheets.*.days.*.day_id").exists().isInt(),
  check("attendance_sheets.*.days.*.attendance_sheet_id").exists().isInt(),
  check("attendance_sheets.*.days.*.date").exists().isISO8601(),
  check("attendance_sheets.*.days.*.date")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601(),
  check("attendance_sheets.*.days.*.from")
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601(),
  check("attendance_sheets.*.days.*.note").exists().isString(),
  check("attendance_sheets.*.days.*.dayli_criteria").exists().isArray(),
  check("attendance_sheets.*.days.*.dayli_criteria.*.dayli_criteria_id")
    .exists()
    .isInt(),
  check("attendance_sheets.*.days.*.dayli_criteria.*.day_id").exists().isInt(),
  check("attendance_sheets.*.days.*.dayli_criteria.*.criteria_id")
    .exists()
    .isInt(),
  check("attendance_sheets.*.days.*.dayli_criteria.*.value")
    .optional({ nullable: true, checkFalsy: true })
    .isInt(),
  check("attendance_sheets.*.days.*.dayli_criteria.*.note")
    .optional({ nullable: true, checkFalsy: true })
    .isString(),
  check("attendance_sheets.*.days.*.dayli_criteria.*.hours").exists().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateAttendanceData;
