import { Router } from "express";
import { postJob } from "../controller/careers.controller";

const router = Router();

router.post('/', postJob);

export default router;