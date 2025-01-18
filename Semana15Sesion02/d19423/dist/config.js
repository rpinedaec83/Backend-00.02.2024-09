"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SECRET = exports.PORT = exports.CLIENTID = exports.CLIENTESECRET = exports.CALLBACKURL = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var PORT = exports.PORT = process.env.PORT;
var SECRET = exports.SECRET = process.env.SECRET;
var CLIENTID = exports.CLIENTID = process.env.CLIENTID;
var CLIENTESECRET = exports.CLIENTESECRET = process.env.CLIENTESECRET;
var CALLBACKURL = exports.CALLBACKURL = process.env.CALLBACKURL;