import {User} from '../models/userModel';
import jwt, { JwtPayload } from 'jsonwebtoken'

export const isAuthenticated = async (req:any,res:any,next:any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader;  
    console.log(token)
    if(!token) return res.json({ msg: "User is not authenticated"});
    next();
}

export const isAdmin =  async(req:any,res:any,next:any) =>{
    const authHeader = req.headers.authorization;
   
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader;  
    // console.log(token)
   

        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            console.log(decoded)
            const user = await User.findById(decoded.userId)  ;
            console.log( 'userId is'+user)

            if(!user) {
                return res.status(401).json({msg: "User does not exist"})
            }
               if(!user.is_admin) {
                return res.status(403).json({msg: "User is not admin"});
            }
            req.user = decoded;
            next();
            
        } catch (err) {
            return res.status(401).json({ msg: "Invalid Token"});
        }
     
};
