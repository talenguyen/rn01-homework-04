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

const Home = props => {
  const onPlayPress = () => {
    props.navigation.navigate(Route.Game);
  };
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>Trúc Xinh</Text>
      <View style={styles.menu}>
        <Button title="Play" onPress={onPlayPress} />
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

export default Home;
