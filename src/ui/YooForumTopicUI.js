import React, {Component, createRef} from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'mintcream',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: screenWidth - 16,
  },
  title: {
    fontSize: 24,
  },
  owner: {
    fontSize: 16,
  },
});
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default class YooForumTopicUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailShowing: false,
      layoutY: 0,
      layoutHeight: 0,
      translate: new Animated.ValueXY({x: 0, y: 0}),
    };
    this.topicHeaderRef = createRef();
    this.onPress = this.onPress.bind(this);
    this.onAnimationFinished = this.onAnimationFinished.bind(this);
  }

  onAnimationFinished() {
    this.setState({detailShowing: !this.state.detailShowing});
  }

  onPress() {
    if (!this.state.detailShowing) {
      this.props.showDetail(this);
    } else {
      this.props.hideDetail();
    }
  }

  render() {
    return (
      <AnimatedPressable
        style={[
          styles.container,
          {transform: this.state.translate.getTranslateTransform()},
        ]}
        onPress={this.onPress}
        onLayout={(event) => {
          this.setState({
            layoutY: event.nativeEvent.layout.y,
            layoutHeight: event.nativeEvent.layout.height,
          });
        }}>
        <View ref={this.topicHeaderRef}>
          <Text style={styles.owner}>{this.props.topic.owner}</Text>
          <Text style={styles.title}>{this.props.topic.title}</Text>
        </View>
      </AnimatedPressable>
    );
  }
}
