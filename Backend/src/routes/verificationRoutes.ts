import { Router } from "express";
import {getUserArmstrongNumbers,isItArmstrong,} from "../controllers/armstrongController";
import { protect } from "../middelwares/authmiddleware";

const router = Router();

router.post("/verify", protect, isItArmstrong);
router.get("/number", protect, getUserArmstrongNumbers);

export default router;