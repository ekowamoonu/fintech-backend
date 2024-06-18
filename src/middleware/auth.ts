import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const config = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(bearerToken, config.TOKEN_KEY as string);
        res.locals.user = decodedToken;
        next();
      } catch (err) {
        return res.status(401).send("Invalid authentication");
      }
    
  }else{
    return res.status(403).send("A token is required for authentication");
  }
  
};

export default verifyToken;
