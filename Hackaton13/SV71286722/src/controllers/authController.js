import { User } from '../models/user.js'
import { bcrypt } from 'bcrypt'
import { jwt } from 'jsonwebtoken'

const register = async ( req, res ) => {
    try{
        const { username, email, password } = req.body
        const hashedPassword = await bcrypt.hash( password, SALT)
        const user = new User({ username, email, password:hashedPassword })
        await user.save()
        res.status(201).json(user)
    }catch(error){
        res.status(500).json({ message : 'Error en el registro', error})
    }
}

const login = async ( req, res ) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user) throw new Error('Username does not exist')
        const isValid = await bcrypt.compareSync(password, user.password)
        if(!isValid) throw new Error('Password is invalid')
        const token = jwt.sign(
            { id: user._id , username: user.username },
            process.env.JWT_SECRET || 'secret_key',
            { 
                expiresIn: '1h' 
            })
        res.json({ token })
    }catch(error){
        res.status(500).json({ message: 'Error en el login', error })
    }
}

export default { register, login }