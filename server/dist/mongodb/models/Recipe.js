"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var RecipeSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  ingredients: {
    type: String,
    required: true
  },
  direction: {
    type: String,
    required: true
  },
  rating: [{
    type: Number
  }]
});

var Recipe = _mongoose["default"].model('Recipe', RecipeSchema);

var _default = Recipe;
exports["default"] = _default;