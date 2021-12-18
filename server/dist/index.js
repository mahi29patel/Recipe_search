"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _connectDB = _interopRequireDefault(require("./mongodb/connectDB"));

var _recipeRoutes = _interopRequireDefault(require("./routes/recipeRoutes"));

var _cors = _interopRequireDefault(require("cors"));

_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 4001;
app.use((0, _cors["default"])());
app.use(_express["default"].json());
(0, _connectDB["default"])();
app.use('/api/recipe', _recipeRoutes["default"]);
app.get('/', function (req, res) {
  res.send("Recipe APP server listening at PORT: ".concat(port, " "));
});
app.listen(port, function () {
  console.log("Server listening at PORT ".concat(port));
});