var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

var wrapComponent = function wrapComponent(_ref) {
  var name = _ref.name,
      className = _ref.className,
      type = _ref.type;

  var Component = function Component(props) {
    var componentClass = cx(className, props.className);
    return React.createElement(type, _extends({}, props, {
      // Prevent Weird quirk where `cx` will evaluate to an empty string, '',
      // and so we have empty `class` attributes in the resulting markup
      // eslint-disable-next-line no-extra-boolean-cast
      className: !!componentClass ? componentClass : undefined
    }));
  };
  Component.displayName = name;
  Component.propTypes = {
    className: PropTypes.string
  };
  return Component;
};

export default wrapComponent;