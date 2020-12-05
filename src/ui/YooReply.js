import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  username: {
    fontSize: 16,
  },
  content: {
    fontSize: 24,
  },
});

export default class YooReply extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.username}>{this.props.reply.username}</Text>
        <Text style={styles.content}>{this.props.reply.content}</Text>
      </View>
    );
  }
}
