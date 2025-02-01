import { CourseController } from "../controllers/courseController.js";
import { Router } from "express";

export const courseRouter = Router();

courseRouter.get('/', CourseController.getAll)
courseRouter.post('/', CourseController.create)

courseRouter.get('/:name', CourseController.findByName)
