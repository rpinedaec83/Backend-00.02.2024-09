import { Coupon } from '../models/coupon.js'

export class CouponController{

    static async getAll(req, res) {
        const coupons = await Coupon.getAll()
        if(!coupons){
            return res.status(500).json({"message":"server error"})
        }
        return res.json(coupons)
    }

    static async create(req, res) {
        const result = req.body

        if(!result){
            return res.status(400).json({"message":"client error"})
        }

        const newCoupon = await Coupon.create({ input : result })

        if(!newCoupon){
            return res.status(500).json({"message":"server error"})
        }

        res.status(201).json(newCoupon)
    }
}
