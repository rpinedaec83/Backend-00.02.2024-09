exports.allAccess = (req,res)=>{
    res.status(200).send('Contenido Publico');
}

exports.userBoard = (req,res)=>{
    res.status(200).send('Contenido de usuario');
}

exports.moderatorBoard = (req,res)=>{
    res.status(200).send('Contenido de moderador');
}

exports.adminBoard = (req,res)=>{
    res.status(200).send('Contenido de administrador');
}