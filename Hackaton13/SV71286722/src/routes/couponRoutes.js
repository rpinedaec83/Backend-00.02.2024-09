import { CouponController } from "../controllers/couponController.js";

import { Router } from "express"

export const couponRouter = Router()

couponRouter.get('/', CouponController.getAll)
couponRouter.post('/', CouponController.create)

