import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import Images from '../assets/images';
import FadeView, {FadeType} from './FadeView';
import FlipCard from './FlipCard';

const Card = ({source, width, height, isUp, isHidden, onPress}) => {
  const size = {width, height};
  const fadeType = isHidden ? FadeType.fadeOut : FadeType.fadeIn;
  return (
    <TouchableOpacity onPress={onPress}>
      <FadeView type={fadeType}>
        <FlipCard isUp={isUp}>
          <Image style={[styles.image, size]} source={source} />
          <Image style={[styles.image, size]} source={Images.cardBack} />
        </FlipCard>
      </FadeView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
  },
});

export default Card;
