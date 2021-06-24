import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {windowWidth, windowHeight} from './src/utilities/size';
import Images from './src/assets/images';

function HookComponent() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: Math.max(insets.bottom, 16),
        backgroundColor: '#fad',
      }}
    />
  );
}

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={Images.background} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: windowWidth,
    height: windowHeight,
  },
  //
  itemContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#ff000030',
  },
  itemText: {
    fontSize: 20,
  },
});
