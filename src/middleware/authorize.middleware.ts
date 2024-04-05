import { NextFunction, Request, Response } from 'express';

export const validaterole = (permittedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any)['user']
        console.log({userInfo: user})
        if (!user) return res.status(401).json({ error: 'Access denied' });

        if(!permittedRoles.includes(user?.role)) {
            return res.status(401).json({ error: 'Access denied' });
        }

        next();

    } catch (error) {

        return res.status(401).send(`unauthorized...`)
    }

}