"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cors = _interopRequireDefault(require("cors"));
require("./utils/local.passport");
require("./utils/googleAuth");
var _index = _interopRequireDefault(require("./routes/index"));
var _index2 = _interopRequireDefault(require("./documentation/index"));
require("dotenv/config");
var _notFound = _interopRequireDefault(require("./controllers/notFound"));
require("./events/eventHandler/user");
require("./events/eventHandler/eventHandler");
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: "*"
}));
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use("/api-docs", _index2["default"]);
app.use((0, _expressSession["default"])({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
try {
  app.use("/api/v1", _index["default"]);
  app.all("*", _notFound["default"]);
} catch (error) {
  /* eslint-disable-next-line no-console */
  console.log(error);
}
var _default = exports["default"] = app;