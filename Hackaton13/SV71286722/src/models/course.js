import { mongoose } from 'mongoose'

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})

courseSchema.statics.getAll = async function(){
    try{
        return this.find()
    }catch(e){
        return null
    }
}

courseSchema.statics.findByName = async function(courseName){
    try{
        return this.find({ name: courseName })
    }catch(e){
        return null
    }
}

courseSchema.statics.create = async function({ input }){
    try{
        const { name, description, img, cover, price } = input
        const newCourse = new this({ name, description, img, cover, price })
        return await newCourse.save()
    }catch(e){
        return null
    }
}

export const Course = mongoose.model('Course', courseSchema)