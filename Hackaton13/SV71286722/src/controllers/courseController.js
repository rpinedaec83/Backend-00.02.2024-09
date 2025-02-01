import { Course } from '../models/course.js'

export class CourseController{

    static async getAll(req, res) {
        const courses = await Course.getAll()
        if(!courses){
            return res.status(500).json({"message":"server error"})
        }
        return res.json(courses)
    }

    static async findByName(req, res) {
        const name = req.params.name

        if(!name){
            return res.status(400).json({"message":"client error"})
        }
        const course = await Course.findByName(name)
        if(!course){
            return res.status(500).json({"message":"server error"})
        }
        return res.json(course)
    }

    static async create(req, res) {
        const result = req.body

        if(!result){
            return res.status(400).json({"message":"client error"})
        }

        const newCourse = await Course.create({ input : result })

        if(!newCourse){
            return res.status(500).json({"message":"server error"})
        }

        res.status(201).json(newCourse)
    }
}