import React from 'react';
import {StyleSheet, Modal, View, Text, TouchableOpacity} from 'react-native';
import {GameState} from '../utilities/constants';

function title(state) {
  if (state === GameState.win) {
    return 'Win';
  }
  if (state === GameState.lose) {
    return 'Lose';
  }
  return 'Welcome';
}

const visible = state =>
  state === GameState.menu ||
  state === GameState.win ||
  state === GameState.lose;

const buttonText = state => {
  if (state === GameState.win || state === GameState.lose) {
    return 'Replay';
  }
  return 'Play';
};

function Menu({state, onPlayPress}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible(state)}
      supportedOrientations={['landscape']}
      onRequestClose={() => {}}>
      <View style={styles.menu}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{title(state)}</Text>
          <TouchableOpacity onPress={onPlayPress}>
            <Text style={styles.play}>{buttonText(state)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#453b32',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: {width: 1, height: 1},
    textShadowColor: 'red',
    textShadowRadius: 1,
  },
  play: {
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
    paddingHorizontal: 16,
    marginTop: 16,
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Menu;
