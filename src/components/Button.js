import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

function Button({title, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 16,
    marginTop: 16,
  },
});

export default Button;
