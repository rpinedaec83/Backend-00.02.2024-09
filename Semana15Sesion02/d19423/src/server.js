var express = require("express");
var path = require("path");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var bodyParser = require("body-parser");
var session = require("express-session");
const passport = require("passport");
const cookieSession = require("cookie-session");
import { SECRET, PORT } from "./config";
var con = require("./database/db");
app.use(
    cookieSession({
        name: "google-auth-session",
        keys: ["key1", "key2"],
    })
);

require("./passport");


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: SECRET }));

var username;
let email = "";
let connections = [];

app.get("/", function (req, res) {
    authenticate(req, res);
});

function authenticate(req, res) {
    //console.log("authenticate called");
    if (!req.session.user) {
        res.sendFile(__dirname + "/public/login.html");
    } else {
        //console.log(req.session.user);
        username = req.session.user;
        res.sendFile(__dirname + "/public/chat.html");
    }
}


app.get(
    "/google",
    passport.authenticate("google", {
        scope: ["email"],
    })
);

app.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/failed",
    }),
    function (req, res) {
        console.log(req.user.email);
        email = req.user.email;
        res.redirect("/success");
    }
);


app.get("/success", (req, res) => {
    //REPLACE INTO `tablename` (`id`, `name`, `age`) VALUES (1, "A", 19)
    var sql =
        "REPLACE INTO login (username , password) VALUES ('" +
        email +
        "' , 'oauth')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        //console.log("1 record inserted");
    });
    req.session.user = email;
    username = email;
    res.redirect("/chat_start");
});

app.get("/chat_start", function (req, res) {
    authenticate(req, res);
});

app.get("/login", function (req, res) {
    authenticate(req, res);
});

app.post("/login", function (req, res) {
    login(req, res);
});

function login(req, res) {
    var post = req.body;
    username = post.user;
    var password = post.password;
    //console.log(username);
    var sql = "SELECT * FROM login WHERE username='" + username + "'";
    con.query(sql, function (err, result, fields) {
        if (result.length === 1) {
            var jsonString = JSON.stringify(result);
            var jsonData = JSON.parse(jsonString);
            if (jsonData[0].password === password) {
                //console.log("User Identified");
                req.session.user = post.user;
                username = post.user;
                res.redirect("/chat_start");
            } else {
                //console.log("user not Identified");
                res.redirect("/login");
            }
        } else {
            res.redirect("/login");
        }
    });
}



app.get("/logout", function (req, res) {
    delete req.session.user;

    req.session = null;
    //req.logout();
    res.redirect("/login");
});



function chat_start() {
    // ===================================Sockets starts  =========================
    io.sockets.on('connection', function (socket) {
        connections.push(socket);
         //console.log("Connected:  %s Socket running", connections.length);
        // ====================Disconnect==========================================
        socket.on('disconnect', function (data) {
            connections.splice(connections.indexOf(data), 1);
            //console.log('Disconnected : %s sockets running', connections.length);
        });
        socket.on('initial-messages', function (data) {
            var sql = "SELECT * FROM message ";
            con.query(sql, function (err, result, fields) {
                var jsonMessages = JSON.stringify(result);
                // console.log(jsonMessages);
                io.sockets.emit('initial-message', { msg: jsonMessages });
            });
        });

        socket.on('username', function (data) {
            socket.emit('username', { username: username });
            //io.sockets.emit('username', {username: username});
        });
        socket.on('send-message', function (data, user) {
            //console.log(user);
            var sql = "INSERT INTO message (message , user) VALUES ('" + data + "' , '" + user + "')";
            con.query(sql, function (err, result) {
                if (err) throw err;
                //console.log("1 record inserted");
            });
            io.sockets.emit('new-message', { msg: data, username: user });
        })

        socket.on('typing', function (data, user) {
            //console.log(user);
            io.sockets.emit('typing', { msg: data, username: user });
        })
    })
}

chat_start();


server.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
});