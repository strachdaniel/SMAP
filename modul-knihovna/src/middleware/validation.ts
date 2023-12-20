import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'joi';

export function validateRequest(schema: AnySchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error }: any = schema.validate(req.body, { convert: true });
    console.log('DATA FROM VALIDATION');
    console.log(req.body);

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ');
      res.status(400).json({
        status: 'error',
        message: errorMessage,
      });
    } else {
      next();
    }
  };
}
