import { mongoose } from 'mongoose'

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderItems: [{
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
        },
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
}, {
    timestamps: true,
})

orderSchema.statics.getAll = async function(){
    try{
        return await this.find().populate('user').populate('course')
    }catch(e){
        return null
    }
}




const Order = mongoose.model('Order', orderSchema)

export default { Order }