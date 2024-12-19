import { Request, Response } from 'express';
import { signupValidation } from '../validations/auth.validation.js';
import { registerUser } from '../services/auth.service.js';
import { generateToken } from '../utils/generateToken.js';

export const signup = async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = signupValidation.parse(req.body);

    // Register user
    const user = await registerUser(validatedData);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};
