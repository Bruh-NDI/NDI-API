import {NextFunction, Request, Response} from "express";
import {sign, verify} from "jsonwebtoken";

export interface RequestWithUser extends Request {
    user: {
        id: number; // Replace with your user ID type
        token: string; // Replace with your token type
    };
}

export const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        const randomUserId = Math.floor(Math.random() * 1000);
        const newToken = sign({id: randomUserId}, process.env.JWT || '', {expiresIn: 1000});

        // @ts-ignore
        req.user = {id: randomUserId, token: newToken};
        res.setHeader('Authorization', `Bearer ${newToken}`);
        next();
    } else {
        const bearer = token.split(' ');
        verify(bearer.length === 2 ? bearer[1] : bearer[0], process.env.JWT || '', (err, decoded) => {
            let id = 0
            if (err || !decoded)
                id = Math.floor(Math.random() * 1000);
            else { // @ts-ignore
                id = decoded.id
            }

            // @ts-ignore
            const newToken = sign({id}, process.env.JWT || '', {expiresIn: 1000});

            // @ts-ignore
            req.user = {id: decoded.id, token: newToken};
            next();
        });
    }
};