import { Response, NextFunction } from "express";
import axios, { AxiosRequestConfig } from "axios";
import { CustomRequest } from "../interfaces/CustomRequest";
import { employee, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const isAuth = async (req, res, next) => {
  //log requst and requested URL
  console.log(req.method, req.url);

  const config: AxiosRequestConfig = {
    method: "get",
    url: "http://auth-service:3001/auth/verify",
    headers: {
      authorization: req.headers.authorization,
    },
  };

  try {
    const response = await axios(config);

    if (response.data && response.status === 200) {
      const user = response.data;
      const profile = await getEmployeeProfile(user.email);

      user.profile = profile;
      req.user = user;
      next();
    } else {
      return;
    }
  } catch (err) {
    console.log(err);

    if (err.response.status === 401) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};

export const isAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  if (user.admin) {
    next();
  } else {
    res.sendStatus(403);
  }
};

export const checkRoles = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    if (roles.includes(user.role)) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};

const getEmployeeProfile = async (email) => {
  const user = await prisma.employee.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};
