import { verify } from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || " "
const makePrivate = (req:any, res:any, next:any) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1]; 
    verify( 
        token,
        TOKEN_SECRET,
        (err:any, decoded:any) => {
            if (err) return res.sendStatus(403);
            req.user = decoded?.user;
            next();
        }
    );
};

export default makePrivate; 