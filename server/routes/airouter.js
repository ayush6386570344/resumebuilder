import express from "express";
import protect from "../middleware/authmiddleware.js";
import { enhancejobdescription, enhanceprofessionalsummary ,uploadexistingresume} from "../controller/aicontroller.js";
import { updateresume } from "../controller/resumecontroller.js";
const airouter=express.Router();
airouter.post('/enhance-pro-sum',protect,enhanceprofessionalsummary);
airouter.post('/enhance-job-desc',protect,enhancejobdescription);
airouter.post('/upload-resume',protect,uploadexistingresume);
export default airouter;