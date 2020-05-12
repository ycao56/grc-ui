"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _carbonComponents = require("carbon-components");

var _ = _interopRequireDefault(require("@carbon/icons-react/lib/view/16"));

var _2 = _interopRequireDefault(require("@carbon/icons-react/lib/view--off/16"));

var _3 = _interopRequireDefault(require("@carbon/icons-react/lib/warning--filled/16"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var prefix = _carbonComponents.settings.prefix;

var PasswordInput =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PasswordInput, _React$Component);

  function PasswordInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PasswordInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PasswordInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      type: 'password'
    });

    _defineProperty(_assertThisInitialized(_this), "togglePasswordVisibility", function () {
      _this.setState({
        type: _this.state.type === 'password' ? 'text' : 'password'
      });
    });

    return _this;
  }

  _createClass(PasswordInput, [{
    key: "render",
    value: function render() {
      var _classNames, _classNames2;

      var _this$props = this.props,
          alt = _this$props.alt,
          labelText = _this$props.labelText,
          className = _this$props.className,
          id = _this$props.id,
          placeholder = _this$props.placeholder,
          _onChange = _this$props.onChange,
          _onClick = _this$props.onClick,
          hideLabel = _this$props.hideLabel,
          invalid = _this$props.invalid,
          invalidText = _this$props.invalidText,
          helperText = _this$props.helperText,
          light = _this$props.light,
          other = _objectWithoutProperties(_this$props, ["alt", "labelText", "className", "id", "placeholder", "onChange", "onClick", "hideLabel", "invalid", "invalidText", "helperText", "light"]);

      var errorId = id + '-error-msg';
      var textInputClasses = (0, _classnames.default)("".concat(prefix, "--text-input"), "".concat(prefix, "--password-input"), className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefix, "--text-input--light"), light), _defineProperty(_classNames, "".concat(prefix, "--text-input--invalid"), invalid), _classNames));

      var sharedTextInputProps = _objectSpread({
        id: id,
        onChange: function onChange(evt) {
          if (!other.disabled) {
            _onChange(evt);
          }
        },
        onClick: function onClick(evt) {
          if (!other.disabled) {
            _onClick(evt);
          }
        },
        placeholder: placeholder,
        type: this.state.type,
        className: textInputClasses
      }, other);

      var labelClasses = (0, _classnames.default)("".concat(prefix, "--label"), (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefix, "--visually-hidden"), hideLabel), _defineProperty(_classNames2, "".concat(prefix, "--label--disabled"), other.disabled), _classNames2));
      var helperTextClasses = (0, _classnames.default)("".concat(prefix, "--form__helper-text"), _defineProperty({}, "".concat(prefix, "--form__helper-text--disabled"), other.disabled));
      var label = labelText ? _react.default.createElement("label", {
        htmlFor: id,
        className: labelClasses
      }, labelText) : null;
      var error = invalid ? _react.default.createElement("div", {
        className: "".concat(prefix, "--form-requirement"),
        id: errorId
      }, invalidText) : null;
      var passwordIsVisible = this.state.type === 'text';
      var passwordVisibilityToggleButtonClasses = (0, _classnames.default)("".concat(prefix, "--text-input--password__visibility"), "".concat(prefix, "--tooltip__trigger"), "".concat(prefix, "--tooltip--icon__bottom"), {});
      var passwordVisibilityIcon = passwordIsVisible ? _react.default.createElement(_2.default, {
        className: "".concat(prefix, "--icon-visibility-off")
      }) : _react.default.createElement(_.default, {
        className: "".concat(prefix, "--icon-visibility-on")
      });

      var input = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("input", _extends({}, (0, _util.textInputProps)({
        invalid: invalid,
        sharedTextInputProps: sharedTextInputProps,
        errorId: errorId
      }), {
        "data-toggle-password-visibility": this.state.type === 'password'
      })), _react.default.createElement("button", {
        className: passwordVisibilityToggleButtonClasses,
        "aria-label": alt || "".concat(passwordIsVisible ? 'Hide' : 'Show', " password"),
        onClick: this.togglePasswordVisibility
      }, passwordVisibilityIcon));

      var helper = helperText ? _react.default.createElement("div", {
        className: helperTextClasses
      }, helperText) : null;
      return _react.default.createElement("div", {
        className: "".concat(prefix, "--form-item ").concat(prefix, "--text-input-wrapper ").concat(prefix, "--password-input-wrapper")
      }, label, helper, _react.default.createElement("div", {
        className: "".concat(prefix, "--text-input__field-wrapper"),
        "data-invalid": invalid || null
      }, invalid && _react.default.createElement(_3.default, {
        className: "".concat(prefix, "--text-input__invalid-icon")
      }), input), error);
    }
  }]);

  return PasswordInput;
}(_react.default.Component);

exports.default = PasswordInput;
PasswordInput.propTypes = {
  /**
   * Provide custom alt text for the password visibility toggle button
   */
  alt: _propTypes.default.string,

  /**
   * Provide a custom className that is applied directly to the underlying
   * <input> node
   */
  className: _propTypes.default.string,

  /**
   * Optionally provide the default value of the <input>
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Specify whether the control is disabled
   */
  disabled: _propTypes.default.bool,

  /**
   * Provide a unique identifier for the input field
   */
  id: _propTypes.default.string.isRequired,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: _propTypes.default.node.isRequired,

  /**
   * Optionally provide an `onChange` handler that is called whenever <input>
   * is updated
   */
  onChange: _propTypes.default.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * <input> is clicked
   */
  onClick: _propTypes.default.func,

  /**
   * Specify the placeholder attribute for the <input>
   */
  placeholder: _propTypes.default.string,

  /**
   * Provide the current value of the <input>
   */
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * Specify whether or not the underlying label is visually hidden
   */
  hideLabel: _propTypes.default.bool,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: _propTypes.default.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: _propTypes.default.string,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: _propTypes.default.node,

  /**
   * Specify light version or default version of this control
   */
  light: _propTypes.default.bool
};
PasswordInput.defaultProps = {
  alt: '',
  className: 'bx--text__input',
  disabled: false,
  onChange: function onChange() {},
  onClick: function onClick() {},
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false
};