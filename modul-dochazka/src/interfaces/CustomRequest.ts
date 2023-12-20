import { Request } from "express";

export interface CustomRequest extends Request {
  user: any; // or whatever the type of user is
  headers: Request["headers"] & { authorization?: string };
}
