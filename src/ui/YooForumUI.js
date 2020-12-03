import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import YooForumTopicUI from './YooForumTopicUI';

const styles = StyleSheet.create({
  hintContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    marginTop: 120,
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  hint: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  indicator: {
    marginTop: 64,
  },
});

export default class YooForumUI extends Component {
  render() {
    return (
      <ScrollView>
        {this.props.hint === '' ? (
          this.props.topics.map((topic, key) => (
            <YooForumTopicUI topic={topic} key={key} />
          ))
        ) : (
          <View style={styles.hintContainer}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
            />
            <Text style={styles.hint}>{this.props.hint}</Text>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.indicator}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}
