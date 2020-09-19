import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FlatListWithLoop from 'react-native-flatlist-with-loop';

export default function App() {
  const listItemSize = 80;
  const listItemMargin = 6;

  return (
    <SafeAreaView style={styles.container}>
      <FlatListWithLoop
        horizontal
        data={[...Array(9).keys()]}
        renderItem={({ item }) => (
          <View
            style={{
              margin: listItemMargin,
              width: listItemSize,
              height: listItemSize,
              borderRadius: listItemSize,
              backgroundColor: '#FFE402',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '900',
              }}
            >
              {`${item}`}
            </Text>
          </View>
        )}
        getItemLength={(_index: number) => listItemSize + listItemMargin}
        keyExtractor={(_item: any, _index: any) => `example-item-${_index}`}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
