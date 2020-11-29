import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StatusBarHeight} from './api/StatusBarHeight';
import YooLogin from './component/YooLogin';
import {YooBackground} from './ui/YooBackground';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    paddingTop: StatusBarHeight,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <YooBackground />
      <YooLogin />
    </View>
  );
}
