import React from 'react';
import {Route} from '../navigation';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import Button from '../components/Button';

const Result = props => {
  const onReplayPress = () => {
    props.navigation.replace(Route.Game);
  };
  const onHomePress = () => {
    props.navigation.navigate(Route.Home);
  };
  const isDarkMode = useColorScheme() === 'dark';

  const {result} = props.route.params;
  const resultStyle = result === 'win' ? styles.win : styles.lose;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>Result</Text>
      <Text style={resultStyle}>{result}</Text>
      <View style={styles.menu}>
        <Button title="Replay" onPress={onReplayPress} />
        <Button title="Home" onPress={onHomePress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#453b32',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: {width: 1, height: 1},
    textShadowColor: 'red',
    textShadowRadius: 1,
    marginTop: 16,
  },
  win: {
    color: '#32a852',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
  lose: {
    color: '#a83232',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
  button: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: {width: 1, height: 1},
    textShadowColor: 'red',
    textShadowRadius: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#453b32',
    backgroundColor: '#ffd257',
    paddingHorizontal: 32,
  },
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Result;
