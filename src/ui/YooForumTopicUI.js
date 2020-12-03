import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  title: {
    fontSize: 36,
  },
  owner: {
    fontSize: 24,
  },
});

export default class YooForumTopicUI extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.topic.title}</Text>
        <Text style={styles.owner}>{this.props.topic.owner}</Text>
      </View>
    );
  }
}
