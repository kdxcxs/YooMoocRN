import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import YooForumTopic from '../component/YooForumTopic';

const screenWidth = Dimensions.get('window').width;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const styles = StyleSheet.create({
  container: {
    width: screenWidth * 2,
  },
  hintContainer: {
    flex: 1,
    alignItems: 'center',
    left: -screenWidth / 2,
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
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      currentPosition: 0,
      translateX: new Animated.Value(0),
    };
    this.showDetail = this.showDetail.bind(this);
    this.hideDetail = this.hideDetail.bind(this);
  }

  showDetail(topicRef) {
    this.setState({scrollEnabled: false});
    Animated.parallel([
      Animated.timing(topicRef.state.translate, {
        toValue: {
          x: screenWidth,
          y: this.state.currentPosition - topicRef.state.layoutY + 8,
        },
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.translateX, {
        toValue: -screenWidth,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }

  hideDetail(topicRef) {
    this.setState({scrollEnabled: true});
    Animated.parallel([
      Animated.timing(topicRef.state.translate, {
        toValue: {
          x: 0,
          y: 0,
        },
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    return (
      <AnimatedScrollView
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: this.state.translateX,
              },
            ],
          },
        ]}
        scrollEnabled={this.state.scrollEnabled}
        onScroll={(event) =>
          this.setState({currentPosition: event.nativeEvent.contentOffset.y})
        }>
        {this.props.hint === '' ? (
          this.props.topics.map((topic, key) => (
            <YooForumTopic
              key={key}
              topic={topic}
              showDetail={this.showDetail}
              hideDetail={this.hideDetail}
            />
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
      </AnimatedScrollView>
    );
  }
}
