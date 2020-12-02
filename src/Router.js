import React, {Component} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import {YooLogin, YooForum} from './component/index';

const width = Dimensions.get('window').width;

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentX: new Animated.Value(0),
      nextX: new Animated.Value(width),
    };
    this.gotoForum = this.gotoForum.bind(this);
  }

  gotoForum() {
    Animated.parallel([
      Animated.timing(this.state.currentX, {
        toValue: -width,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.nextX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }

  render() {
    return (
      <View>
        <Animated.View style={{left: this.state.currentX}}>
          <YooLogin onSuccess={this.gotoForum} />
        </Animated.View>
        <Animated.View style={{left: this.state.nextX}}>
          <YooForum />
        </Animated.View>
      </View>
    );
  }
}
