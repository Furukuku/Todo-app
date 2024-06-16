import jwt from "jsonwebtoken";
import "dotenv/config";

/**
 * Checks the user if authenticated
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - An executable function to jump to the next route
 * @returns 
 */
export const checkIfAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'You are not authenticated.' });

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'You are not authorized.' });

    req.userId = decoded.id;
    next();
  });
};

/**
 * Checks the user if only guest
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {object} next - An executable function to jump to the next route
 * @returns 
 */
export const checkIfGuest = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];

  if (token == null) return res.status(403).json({ message: 'You are not authenticated.' });

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
    if (err) return res.status(200).json({ message: 'You are guest.' });

    req.userId = decoded.id;
    next();
  });
};