import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

const FadeView = props => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0

  useEffect(() => {
    let fromValue, toValue;
    if (props.type === FadeType.fadeIn) {
      fromValue = 0;
      toValue = 1;
    } else {
      fromValue = 1;
      toValue = 0;
    }
    fadeAnim.setValue(fromValue);
    Animated.timing(fadeAnim, {
      toValue: toValue,
      duration: 300,
      perspective: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, props.type]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

export default FadeView;

export const FadeType = {
  fadeIn: 1,
  fadeOut: 2,
};
