import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import * as R from 'ramda';

function FlatListWithLoop({
  data,
  horizontal,
  getItemLength = (_index: number) => 80,
  ...props
}: any) {
  let offset = getItemLength(0) / 2;
  const flRef = useRef<FlatList>();

  // const [isResettingData, setIsResettingData] = useState(false);
  const [end, setEnd] = useState(true);
  const [flData, setFlData] = useState<Array<any>>();

  useEffect(() => {
    const fetch = async () => {
      // setIsResettingData(true);
      if (!data) setFlData(data);
      else {
        setFlData([...data, ...data]);
        setTimeout(() => {
          flRef.current?.scrollToIndex({
            index: Number(data.length),
            animated: false,
          });
        }, 0);
      }
    };
    fetch();
  }, [data]);

  const checkScroll = async ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    if (!data) return;
    if (!flData) return;
    if (flData.length >= Number(data?.length) * 3) {
      setFlData(flData.slice(Number(data.length) * 2));
    }

    const offsetChecker = horizontal ? contentOffset.x : contentOffset.y;
    const layoutMeasurementChecker = horizontal
      ? layoutMeasurement.width
      : layoutMeasurement.height;
    const contentSizeChecker = horizontal
      ? contentSize.width
      : contentSize.height;
    if (offsetChecker <= offset) {
      setFlData([...flData, ...data]);
      setTimeout(() => {
        flRef.current?.scrollToIndex({
          index: Number(data.length),
          animated: false,
        });
      }, 0);
    }
    if (
      layoutMeasurementChecker + offsetChecker >= contentSizeChecker - offset &&
      end
    ) {
      setFlData([...flData, ...data]);
      setEnd(false);
    } else {
      setEnd(true);
    }
  };

  // const onEndReached = () => {
  //   if (!data || !flData) return;
  //   setFlData([...flData, ...data]);
  // };

  const getItemOffset = (index: number) => {
    return R.sum(R.times((n) => getItemLength(n), index + 1)) - offset;
  };

  return (
    <FlatList
      ref={flRef}
      onScroll={({ nativeEvent }) => checkScroll(nativeEvent)}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: getItemLength(index),
        offset: getItemOffset(index),
        index,
      })}
      keyExtractor={(item, index) =>
        `react-native-flatlist-with-loop-item-${index}`
      }
      // onEndReachedThreshold={1}
      // onEndReached={onEndReached}
      {...props}
      data={flData}
    />
  );
}

export default FlatListWithLoop;
