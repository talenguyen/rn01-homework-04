import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {windowWidth, windowHeight} from '../utilities/size';
import Images from '../assets/images';
import Desk from '../components/Desk';
import Timer from '../components/Timer';
import {Route} from '../navigation';

const ContentView = ({navigation}) => {
  const onTimeOut = () => {
    navigation.replace(Route.Result, {result: 'lose'});
  };

  const onCompleted = () => {
    navigation.replace(Route.Result, {result: 'win'});
  };

  const insets = useSafeAreaInsets();
  const paddingHorizontal = Math.max(insets.left, insets.right);
  const paddingVertical = Math.max(insets.top, insets.bottom);
  const sizeStyle = {paddingHorizontal, paddingBottom: paddingVertical};
  const deskWidth = windowWidth - 2 * paddingHorizontal;
  const deskHeight = windowHeight - 2 * paddingVertical;

  return (
    <View style={[styles.content, sizeStyle]}>
      <Timer duration={10} isRunning={true} onTimeOut={onTimeOut} />
      <Desk
        width={deskWidth}
        height={deskHeight}
        columns={8}
        onCompleted={onCompleted}
      />
    </View>
  );
};

const Game = props => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={Images.background}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ContentView navigation={props.navigation} />
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

export default Game;
