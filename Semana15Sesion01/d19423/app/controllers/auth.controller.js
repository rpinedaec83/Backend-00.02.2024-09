const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const User = db.user;
const Role = db.role;

exports.signup = (req, res)=>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(req.body.roles){
            Role.find({
                name: {$in: req.body.roles}
            }, (err,roles)=>{
                if(err){
                    res.status(500).send({message:err});
                    return;
                }
                user.roles = roles.map((role)=>role._id);
                user.save((err)=>{
                    if(err){
                        res.status(500).send({message:err});
                        return;
                    }
                    res.send({message: `Usuario registrado correctamente`})
                });
            });
        }
        else{
            Role.findOne({name:"user"}, (err,role)=>{
                if(err){
                    res.status(500).send({message:err});
                    return;
                }
                user.roles = [role._id];
                user.save((err)=>{
                    if(err){
                        res.status(500).send({message:err});
                        return;
                    }
                    res.send({message: `Usuario registrado correctamente`})
                });
            })
        }
    });
}

exports.signout = async(req,res)=>{
    try {
        req.session =null;
        res.status(200).send({message:"Tu sesion a terminado"})
    } catch (error) {
        this.next(error);
    }
}

exports.signin = (req,res)=>{
    User.findOne({username:req.body.username}).populate("roles","-__v").exec((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(!user){
            res.status(404).send({message:"USuario no encontrado"});
            return;
        }
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401).send({message:"Password invalido"})
        }
        const token = jwt.sign({id: user.id}, 
            process.env.jwtSecret,
            {
                algorithm: "HS256",
                allowInsecureKeySizes:true,
                expiresIn: 86400
            }
        );
        let authorities = [];
        for (let index = 0; index < user.roles.length; index++) {
            const element = user.roles[index];
            authorities.push(element);
        }
        req.session.token = token;

        res.status(200).send({
            id: user._id,
            username: user.username,
            email:user.email,
            roles: authorities
        });
    })
}