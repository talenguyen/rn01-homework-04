import React, {useState} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {windowWidth, windowHeight} from './src/utilities/size';
import Images from './src/assets/images';
import Desk from './src/components/Desk';
import Timer from './src/components/Timer';
import Menu from './src/components/Menu';
import {GameState} from './src/utilities/constants';

const ContentView = () => {
  const [state, setState] = useState(GameState.menu);
  const [turn, setTurn] = useState(0);

  const onPlayPress = () => {
    setState(GameState.playing);
    setTurn(turn + 1);
  };

  const onTimeOut = () => {
    setState(GameState.lose);
  };

  const onCompleted = () => {
    setState(GameState.win);
  };

  const insets = useSafeAreaInsets();
  const paddingHorizontal = Math.max(insets.left, insets.right);
  const paddingVertical = Math.max(insets.top, insets.bottom);
  const sizeStyle = {paddingHorizontal, paddingBottom: paddingVertical};
  const deskWidth = windowWidth - 2 * paddingHorizontal;
  const deskHeight = windowHeight - 2 * paddingVertical;

  return (
    <View style={[styles.content, sizeStyle]}>
      <Timer
        duration={30}
        isRunning={state === GameState.playing}
        onTimeOut={onTimeOut}
      />
      <Desk
        width={deskWidth}
        height={deskHeight}
        columns={2}
        onCompleted={onCompleted}
      />
      <Menu state={state} onPlayPress={onPlayPress} />
    </View>
  );
};

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
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default App;
