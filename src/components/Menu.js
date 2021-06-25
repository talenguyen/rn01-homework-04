import React from 'react';
import {StyleSheet, Modal, View, Text, TouchableOpacity} from 'react-native';

function Menu({visible, title, onPlayPress}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      supportedOrientations={['landscape']}
      onRequestClose={() => {}}>
      <View style={styles.menu}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onPlayPress}>
            <Text style={styles.play}>Play</Text>
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
