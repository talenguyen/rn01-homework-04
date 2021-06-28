import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import Images from '../assets/images';
import FadeView, {FadeType} from './FadeView';

const Card = ({source, width, height, isUp, isHidden, onPress}) => {
  const size = {width, height};
  const fadeType = isHidden ? FadeType.fadeOut : FadeType.fadeIn;

  const imageView = isUp ? (
    <FadeView type={fadeType}>
      <Image style={[styles.image, size]} source={source} />
    </FadeView>
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
