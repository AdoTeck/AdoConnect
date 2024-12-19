import User, { IUser } from '../models/user.model.js';

export const registerUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};
