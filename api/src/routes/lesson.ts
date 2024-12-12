import { Router } from "express";
import { getLesson, getLessonById, submitLesson, createLesson } from "../controller/lesson.controller";

const router = Router();

router.get('/:category', getLesson);
router.get('/:category/:id', getLessonById);
router.post('/:category/:id/submit', submitLesson);
router.post('/create', createLesson);

export default router;