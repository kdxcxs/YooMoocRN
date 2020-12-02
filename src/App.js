import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {StatusBarHeight} from './api/StatusBarHeight';
import {YooBackground} from './component/index';
import Router from './Router';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    paddingTop: Platform.OS === 'ios' ? StatusBarHeight : 0,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <YooBackground />
      <Router />
    </View>
  );
}
