"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
require("./App.css");
var _SlotCounter = _interopRequireDefault(require("./SlotCounter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function App() {
  const [number, setNumber] = (0, _react.useState)(1020);
  const updateValue = () => {
    setNumber(Math.floor(Math.random() * 9999));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    value: number,
    onChange: e => setNumber(Number(e.target.value))
  }), /*#__PURE__*/React.createElement("button", {
    onClick: updateValue
  }, "Change Value")), /*#__PURE__*/React.createElement(_SlotCounter.default, {
    value: number
  }));
}
var _default = exports.default = App;