import express from 'express'
import { getuserbyid, getuserresumes, loginuser, registeruser } from  '../controller/user.js';
import protect from '../middleware/authmiddleware.js';
const userRouter=express.Router();
userRouter.post('/register',registeruser)
userRouter.post('/login',loginuser)
userRouter.get('/data',protect, getuserbyid)
userRouter.get('/resumes',protect,getuserresumes)

export default userRouter