import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Home from './screens/Home';

EStyleSheet.build({
  $primaryColor: '#009cde',
  $border: '#E2E2E2E2',
  $white: '#ffffff',
  $inputText: '#79797979',
  $lightGrey: '#F0F0F0F0',
});

export default () => <Home />;
