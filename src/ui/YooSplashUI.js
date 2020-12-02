import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    marginTop: 120,
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  indicator: {
    marginTop: 64,
  },
});

export default class YooSplashUI extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.text}>正在检查网络，请稍后</Text>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.indicator}
        />
      </View>
    );
  }
}
