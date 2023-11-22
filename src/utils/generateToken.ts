import jwt from 'jsonwebtoken';

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: '2h',
  });
};

export default generateToken;
