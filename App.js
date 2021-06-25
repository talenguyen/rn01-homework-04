import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {windowWidth, windowHeight} from './src/utilities/size';
import Images from './src/assets/images';
import Desk from './src/components/Desk';

function ContentView() {
  const insets = useSafeAreaInsets();
  const paddingHorizontal = Math.max(insets.left, insets.right);
  const paddingVertical = Math.max(insets.top, insets.bottom);
  const sizeStyle = {paddingHorizontal, paddingVertical};
  const deskWidth = windowWidth - 2 * paddingHorizontal;
  const deskHeight = windowHeight - 2 * paddingVertical;
  return (
    <View style={[styles.content, sizeStyle]}>
      <Desk width={deskWidth} height={deskHeight} columns={8} />
    </View>
  );
}

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={Images.background}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ContentView />
        </SafeAreaProvider>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: windowWidth,
    height: windowHeight,
  },
  content: {
    flex: 1,
  },
});

export default App;
