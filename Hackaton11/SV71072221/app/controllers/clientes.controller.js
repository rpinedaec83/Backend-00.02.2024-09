const db = require('../models');
const Op = db.sequelize.Op;
const Tutorial = db.tutorials;



exports.create=(req,res)=>{
    if(!req.body.title){
        res.status(400).send({
            message: "El campo titulo no puede estar vacio"
        })
        return;
    }
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        published: req.body.published ? req.body.published: false
    }
    Tutorial.create(tutorial).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Ha ocurrido un error en el servidor"
        })
    })
};

exports.findAll = (req,res)=>{
    const title = req.query.title;
    console.log(title);
    let condition = title? {title:{
        [Op.like]: `%${title}%`
    }}:null;
    console.log(condition);
    Tutorial.findAll({
        include:["comments", "tags"]
    },
{
    where: condition
}).then(data=>{
    res.send(data);
}).catch(err=>{
    res.status(500).send({
        message: err.message || "Ha ocurrido un error en el servidor"
    })
})
}