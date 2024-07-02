import { User } from '../models/userModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const isAuthenticated = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader.split(' ')[1]; 
    if (!token) return res.status(401).json({ msg: "User is not authenticated" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid Token" });
    }
};

export const isAdmin = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader.split(' ')[1]; 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ msg: "User does not exist" });
        }
        if (!user.is_admin) {
            return res.status(403).json({ msg: "User is not admin" });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid Token" });
    }
};
