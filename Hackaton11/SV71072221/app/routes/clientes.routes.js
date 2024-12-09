module.exports= app=>{
    let router = require('express').Router();
    const tutorial = require('../controllers/tutorial.controller');
    router.post('/', tutorial.create)
    router.get('/', tutorial.findAll)



    app.use('/api/tutorial', router);
}