import jwt from 'jsonwebtoken';

export const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
