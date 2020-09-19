"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const FlatListWithLoop = ({
  data = null,
  horizontal,
  ...props
} = {}) => {
  let offset = 20;
  const listItemDepth = 92;
  const lastItemDepth = 20;

  const _ref = (0, _react.useRef)();

  const [end, setEnd] = (0, _react.useState)(true);
  const [flData, setFlData] = (0, _react.useState)(data);
  (0, _react.useEffect)(() => {
    const fetch = async () => {
      setFlData([...(data !== null && data !== void 0 ? data : []), ...(data !== null && data !== void 0 ? data : [])]);
      setTimeout(() => {
        var _ref$current;

        (_ref$current = _ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollToIndex({
          index: Number(data === null || data === void 0 ? void 0 : data.length),
          animated: false
        });
      }, 0);
    };

    fetch();
  }, [data]);

  const checkScroll = async ({
    layoutMeasurement,
    contentOffset,
    contentSize
  }) => {
    if (flData.length >= Number(data === null || data === void 0 ? void 0 : data.length) * 3) setFlData(flData.slice(Number(data === null || data === void 0 ? void 0 : data.length) * 2));

    if (contentOffset.x <= offset) {
      var _ref$current2;

      setFlData([...flData, ...data]);
      (_ref$current2 = _ref.current) === null || _ref$current2 === void 0 ? void 0 : _ref$current2.scrollToIndex({
        index: Number(data === null || data === void 0 ? void 0 : data.length),
        animated: false
      });
    }

    if (layoutMeasurement.width + contentOffset.x >= contentSize.width - offset && end) {
      setFlData([...flData, ...data]);
      setEnd(false);
    } else {
      setEnd(true);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, _extends({
    ref: _ref,
    onScroll: ({
      nativeEvent
    }) => checkScroll(nativeEvent),
    horizontal: horizontal,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    getItemLayout: (data, index) => ({
      length: index % Number(data === null || data === void 0 ? void 0 : data.length) === Number(data === null || data === void 0 ? void 0 : data.length) - 1 ? lastItemDepth : listItemDepth,
      offset: listItemDepth * index - Math.floor(index / Number(data === null || data === void 0 ? void 0 : data.length)) * (listItemDepth + offset),
      index
    })
  }, props));
};

var _default = FlatListWithLoop;
exports.default = _default;
//# sourceMappingURL=index.js.map