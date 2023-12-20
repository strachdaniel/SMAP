import { check, ValidationChain } from 'express-validator';

const validateDayliCriteria = (): ValidationChain[] => {
  return [
    check('dayli_criteria_id').isInt(),
    check('day_id').isInt(),
    check('criteria_id').isInt(),
    check('value').optional().isInt(),
    check('note').optional().isString(),
    check('hours').optional().isInt(),
  ];
};

export default validateDayliCriteria;