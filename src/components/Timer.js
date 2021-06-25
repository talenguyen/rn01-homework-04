import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';

const twoDigitFormat = digit => {
  if (digit > 9) {
    return `${digit}`;
  }
  return `0${digit}`;
};

const format = seconds => {
  if (seconds < 60) {
    return `00:${twoDigitFormat(seconds)}`;
  }
  const minutes = Number.parseInt(seconds / 60, 10);
  const remainSeconds = seconds % 60;
  return `${twoDigitFormat(minutes)}:${twoDigitFormat(remainSeconds)}`;
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {seconds: props.duration};
  }

  cleanUp = () => {
    this.interval && clearInterval(this.interval);
    this.interval = null;
  };

  tick = () => {
    console.log('tick');
    const seconds = this.state.seconds - 1;
    this.setState({seconds});
    if (seconds === 0) {
      this.cleanUp();
      this.props.onTimeOut && this.props.onTimeOut();
    }
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    this.cleanUp();
  }

  render() {
    return <Text style={styles.title}>{format(this.state.seconds)}</Text>;
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#1d2024',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Timer;
