import React, {Component} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import {YooLogin, YooForum, YooSplash} from './component/index';

const width = Dimensions.get('window').width;

export default class YooRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'splash',
      splashX: new Animated.Value(0),
      loginX: new Animated.Value(width),
      forumX: new Animated.Value(width),
    };
    this.gotoForum = this.gotoForum.bind(this);
    this.gotoLogin = this.gotoLogin.bind(this);
  }

  gotoLogin() {
    this.setState({currentPage: 'login'});
    Animated.parallel([
      Animated.timing(this.state.splashX, {
        toValue: -width,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.loginX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }

  gotoForum() {
    if (this.state.currentPage === 'splash') {
      Animated.parallel([
        Animated.timing(this.state.splashX, {
          toValue: -width,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.forumX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(this.state.loginX, {
          toValue: -width,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.forumX, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }

  render() {
    return (
      <View>
        <Animated.View style={{left: this.state.splashX}}>
          <YooSplash gotoLogin={this.gotoLogin} gotoForum={this.gotoForum} />
        </Animated.View>
        <Animated.View style={{left: this.state.loginX}}>
          <YooLogin gotoForum={this.gotoForum} />
        </Animated.View>
        <Animated.View style={{left: this.state.forumX}}>
          <YooForum />
        </Animated.View>
      </View>
    );
  }
}
