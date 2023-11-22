import jwt from 'jsonwebtoken'
import {JWT_SECRET_KEY} from '../config'

const generateToken = (payload:any): string => {
  return jwt.sign(
    payload, 
    JWT_SECRET_KEY, 
    {
      expiresIn: '2h',
    }
  );
};

export default generateToken;
