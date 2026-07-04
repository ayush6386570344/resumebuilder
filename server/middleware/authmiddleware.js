import jwt from 'jsonwebtoken'
const protect= async (req,res,next)=>{
    const token =req.headers.authorization;
    // console.log("token in authmiddleware",token);
    if (!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        req.userid=decoded.userid;      
        next();
    }
    catch(error){
        return res.status(401).json({message:'Unauthorized request'});
    }
}

export default protect;