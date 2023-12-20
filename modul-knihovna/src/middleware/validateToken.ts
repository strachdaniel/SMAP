import { Request, Response, NextFunction } from 'express';
import axios, { AxiosRequestConfig } from 'axios';

interface LibRequest extends Request {
  user?: {};
}

export const isAuth = async (
  req: LibRequest,
  res: Response,
  next: NextFunction
) => {
  //log requst and requested URL
  console.log(req.method, req.url);

  const config: AxiosRequestConfig = {
    method: 'get',
    url: 'http://auth:3001/auth/verify',
    headers: {
      authorization: req.headers.authorization,
    },
  };

  console.log(config);

  try {
    const response = await axios(config);

    if (response.data && response.status === 200) {
      req.user = response.data;
      next();
    } else {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
    next(err); // add this line to call the next middleware in case of an error
  }
};
