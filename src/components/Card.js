import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import Images from '../assets/images';

const EmptyCard = ({width, height}) => <View style={{width, height}} />;

const Card = ({source, width, height, isUp, isHidden, onPress}) => {
  const size = {width, height};
  if (isHidden) {
    return <EmptyCard width={width} height={height} />;
  }

  const imageView = isUp ? (
    <Image style={[styles.image, size]} source={source} />
  ) : (
    <Image style={[styles.image, size]} source={Images.cardBack} />
  );
  return <TouchableOpacity onPress={onPress}>{imageView}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
  },
});

export default Card;
