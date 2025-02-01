const mongoose = require ('mongoose')
mongoose.connect(process.env.MONGOURI).then(db=> console.log("BD is connected")).catch(error=>console.log(error));