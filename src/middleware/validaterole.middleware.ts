import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import Application from '../config/app.config';

export const validatetoken = () => (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        console.log({token})
        if (!token) return res.status(401).json({ error: 'Access denied' });

        const decoded: any = jwt.verify(token, Application.APP_SECRET_KEY);

        console.log({ decoded });

        (req as any)['user'] = decoded.findUser;

        next();

    } catch (error) {

        return res.status(401).send(`unauthorized...`)
    }

}