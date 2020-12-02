import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default class YooForumUI extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Forum</Text>
      </View>
    );
  }
}
