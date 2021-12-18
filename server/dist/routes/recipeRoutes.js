"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _Recipe = _interopRequireDefault(require("../mongodb/models/Recipe"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressValidator = require("express-validator");

var router = _express["default"].Router();

router.get('/all', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var recipies;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Recipe["default"].aggregate([{
              $addFields: {
                rating: {
                  $avg: "$rating"
                }
              }
            }]);

          case 3:
            recipies = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              recipies: recipies,
              message: "Recipies fetched"
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              recipies: [],
              message: "Failed to  fetch recipies"
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/:id', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, recipe;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _Recipe["default"].aggregate([{
              $match: {
                $expr: {
                  $eq: ["$_id", _mongoose["default"].Types.ObjectId(id)]
                }
              }
            }, {
              $addFields: {
                rating: {
                  $avg: "$rating"
                }
              }
            }]);

          case 4:
            recipe = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              recipe: recipe,
              message: "Recipies fetched"
            }));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              recipe: {},
              message: "Failed to  fetch recipies"
            }));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/add', (0, _expressValidator.body)('title').isLength({
  min: 5
}), (0, _expressValidator.body)('ingredients').isLength({
  min: 10
}), (0, _expressValidator.body)('direction').isLength({
  min: 10
}), /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _validationResult, errors, recipe;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _validationResult = (0, _expressValidator.validationResult)(req), errors = _validationResult.errors;
            console.log(errors);

            if (!(errors.length > 0)) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(403).json({
              recipe: null,
              message: "Validation failed"
            }));

          case 4:
            _context3.prev = 4;
            recipe = new _Recipe["default"](req.body);
            _context3.next = 8;
            return recipe.save();

          case 8:
            return _context3.abrupt("return", res.status(200).json({
              recipe: recipe,
              message: "Recipies fetched"
            }));

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](4);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(500).json({
              recipe: null,
              message: "Failed to  fetch recipies"
            }));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 11]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put('/update/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, recipe;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _Recipe["default"].findByIdAndUpdate(id, req.body, {
              "new": true
            });

          case 4:
            recipe = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              recipe: recipe,
              message: "Recipe updated"
            }));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(500).json({
              recipe: null,
              message: "Failed to  update recipe"
            }));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/delete/:id', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, recipe;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _Recipe["default"].findByIdAndRemove(id);

          case 4:
            recipe = _context5.sent;
            return _context5.abrupt("return", res.status(200).json({
              recipe: recipe,
              message: "Recipe deleted"
            }));

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(500).json({
              recipe: null,
              message: "Failed to  delete recipe"
            }));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.post('/rate/:id', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, rating, recipeRating, recipe;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            rating = req.body.rating;
            recipeRating = Number(rating).toFixed(0);
            console.log(recipeRating); // if ()

            if (!(recipeRating > 0 && recipeRating <= 5)) {
              _context6.next = 12;
              break;
            }

            _context6.next = 8;
            return _Recipe["default"].findByIdAndUpdate(id, {
              $push: {
                rating: recipeRating
              }
            });

          case 8:
            recipe = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              message: "Recipe rated successfully"
            }));

          case 12:
            return _context6.abrupt("return", res.status(403).json({
              message: "Invalid rating value"
            }));

          case 13:
            _context6.next = 19;
            break;

          case 15:
            _context6.prev = 15;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(500).json({
              message: "Failed to  rate recipe"
            }));

          case 19:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 15]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;