import { mongoose } from 'mongoose'

const couponSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
})

couponSchema.statics.getAll = async function(){
    try{
        return await this.find()
    }catch(e){
        return null
    }
}

couponSchema.statics.create = async function({ input }){
    try{
        const { code, discount, expirationDate } = input
        const newCoupon = new this({ code, discount, expirationDate })
        return await newCoupon.save()
    }catch(e){
        return null
    }
}

export const Coupon = mongoose.model('Coupon', couponSchema)