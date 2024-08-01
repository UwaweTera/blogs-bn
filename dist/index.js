"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _app = _interopRequireDefault(require("./app"));
var _http = _interopRequireDefault(require("http"));
/* eslint-disable */

var http = _http["default"].Server(_app["default"]);
var port = process.env.PORT || 5000;
try {
  http.listen(port, function () {
    console.log("server running on port ".concat(port, " "));
  });
  ioConnect(http);
} catch (error) {
  /* istanbul ignore next */
  console.log(error);
}
var _default = exports["default"] = http;