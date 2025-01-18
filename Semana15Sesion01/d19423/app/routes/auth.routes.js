const { verifySignUp } = require('../middelwares')
const controller = require('../controllers/auth.controller')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        )
        next();
    });

    app.post("/api/auth/singup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );
    app.post("/api/auth/singin", controller.signin)
    app.post("/api/auth/singout", controller.signout)
}