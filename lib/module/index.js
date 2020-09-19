function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';

const FlatListWithLoop = ({
  data = null,
  horizontal,
  ...props
} = {}) => {
  let offset = 20;
  const listItemDepth = 92;
  const lastItemDepth = 20;

  const _ref = useRef();

  const [end, setEnd] = useState(true);
  const [flData, setFlData] = useState(data);
  useEffect(() => {
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

  return /*#__PURE__*/React.createElement(FlatList, _extends({
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

export default FlatListWithLoop;
//# sourceMappingURL=index.js.map