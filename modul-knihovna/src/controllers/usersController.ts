// import { Request, Response } from 'express';
// import * as usersModel from '../models/userModel';
// import { convertToCamelCase, convertToSnakeCase } from '../utils/helpers';

// export const getUsers = async (req: Request, res: Response): Promise<void> => {
//   const users = await usersModel.getUsers(req.query);
//   res.json(convertToCamelCase(users));
// };

// export const getUserById = async (req: Request, res: Response): Promise<void> => {
//   const user = await usersModel.getUserById(parseInt(req.params.id));
//   res.json(convertToCamelCase(user));
// };

// export const createUser = async (req: Request, res: Response): Promise<void> => {
//   const newUser = await usersModel.createUser(convertToSnakeCase(req.body));
//   res.status(201).json(convertToCamelCase(newUser));
// };

// export const updateUser = async (req: Request, res: Response): Promise<void> => {
//   const updatedUser = await usersModel.updateUser(parseInt(req.params.id), convertToSnakeCase(req.body));
//   res.json(convertToCamelCase(updatedUser));
// };

// export const deleteUser = async (req: Request, res: Response): Promise<void> => {
//   await usersModel.deleteUser(parseInt(req.params.id));
//   res.status(204).send();
// };
