import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, View} from 'react-native';

const FlipCard = props => {
  const animatedValue = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    let fromValue, toValue;
    if (props.isUp) {
      fromValue = 180;
      toValue = 0;
    } else {
      fromValue = 0;
      toValue = 180;
    }

    animatedValue.setValue(fromValue);
    Animated.timing(animatedValue, {
      toValue: toValue,
      duration: 300,
      perspective: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, props.isUp]);

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const backAnimatedStyle = {
    transform: [
      {
        rotateY: animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };
  return (
    <View
      style={{
        ...props.style,
      }}>
      <Animated.View style={[styles.card, frontAnimatedStyle]}>
        {props.children[0]}
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
        {props.children[1]}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
  },
});

export default FlipCard;
