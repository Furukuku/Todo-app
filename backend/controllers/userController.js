import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * Check the user if authenticated
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
export const auth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user) {
      return res.status(200).json({ message: 'Authenticated' });
    }
    
    return res.status(401).json({ message: 'Not Authenticated' });
  } catch (err) {
    return res.status(401).json({ message: 'Not Authenticated' });
  }
};

/**
 * Creates a new user
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const errors = {};

    if (firstName.length > 45) {
      errors.firstName = 'First name must not have greater than 45 characters.';
    }

    if (lastName.length > 45) {
      errors.firstName = 'Last name must not have greater than 45 characters.';
    }

    if (!validator.isEmail(email)) {
      errors.email = 'Email is not valid.';
    }

    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (password != confirmPassword) {
      errors.confirmPassword = 'Password confirmation does not match.';
    }

    if (validator.isEmpty(firstName)) {
      errors.firstName = 'First name is required.';
    }

    if (validator.isEmpty(lastName)) {
      errors.lastName = 'Last name is required.';
    }

    if (validator.isEmpty(email)) {
      errors.email = 'Email is required.';
    }

    if (validator.isEmpty(password)) {
      errors.password = 'Password is required.';
    }

    if (validator.isEmpty(confirmPassword)) {
      errors.confirmPassword = 'Password Confirmation is required.';
    }

    const checkUserEmail = await User.findOne({ email: email });

    if (checkUserEmail) {
      errors.email = 'Email is alredy taken.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword
    });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Registered successfully', user: user, accessToken: token });
    }

    return res.status(500).json({ message: 'Something went wrong, please try again.' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong, please try again.' });
  }
};

/**
 * Handles the logging in of a user
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = {};

    if (validator.isEmpty(email)) {
      errors.email = 'Email is required.';
    }

    if (validator.isEmpty(password)) {
      errors.password = 'Password is required.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: email });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' });
      return res.status(200).json({ user: user, accessToken: token });
    }

    return res.status(400).json({ message: 'Invalid credentials.' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong, please try again.' });
  }
};

export const guest = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user) {
      return res.status(401).json({ message: 'You are already authenticated.' });
    }

    return res.status(200).json({ message: 'Not authenticated' });
  } catch (err) {
    return res.status(200).json({ message: 'Not authenticated' });
  }
};