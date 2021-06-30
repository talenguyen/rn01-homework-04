import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';
import Game from '../pages/Game';
import Result from '../pages/Result';

const Stack = createStackNavigator();

export const Route = {
  Home: 'Home',
  Game: 'Game',
  Result: 'Result',
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={Route.Home}>
      <Stack.Screen name={Route.Home} component={Home} />
      <Stack.Screen name={Route.Game} component={Game} />
      <Stack.Screen name={Route.Result} component={Result} />
    </Stack.Navigator>
  );
};
