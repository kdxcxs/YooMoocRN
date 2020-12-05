import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ToastAndroid,
  Animated,
  Keyboard,
} from 'react-native';

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
  input: {
    marginBottom: 24,
    padding: 0,
    fontSize: 24,
    height: 38,
    textAlign: 'center',
    width: 280,
    backgroundColor: 'white',
    opacity: 0.3,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c90ce',
    width: 100,
    height: 50,
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'mintcream',
    fontSize: 26,
  },
});
const AnimatedInput = Animated.createAnimatedComponent(TextInput);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default class YooLoginUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      translateY: new Animated.Value(0),
    };
    this.onButtonPress = this.onButtonPress.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
    this.onKeyboardDidShow = this.onKeyboardDidShow.bind(this);
    this.onKeyboardDidHide = this.onKeyboardDidHide.bind(this);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.onKeyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.onKeyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onButtonPress() {
    if (!this.state.loading) {
      this.setState({loading: true});
      this.props.loginCallback(this.onLoginFailed);
    }
  }

  onLoginFailed(hint) {
    this.setState({loading: false});
    ToastAndroid.show(hint, ToastAndroid.SHORT);
  }

  onKeyboardDidShow() {
    Animated.timing(this.state.translateY, {
      toValue: -320,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  onKeyboardDidHide() {
    Animated.timing(this.state.translateY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <AnimatedImage
          source={require('../../assets/icon.png')}
          style={[
            styles.logo,
            {transform: [{translateY: this.state.translateY}]},
          ]}
        />
        <AnimatedInput
          style={[
            styles.input,
            {transform: [{translateY: this.state.translateY}]},
          ]}
          placeholder={'账号'}
          maxLength={10}
          value={this.props.username}
          onChangeText={(username) => this.props.setUsername(username)}
        />
        <AnimatedInput
          style={[
            styles.input,
            {transform: [{translateY: this.state.translateY}]},
          ]}
          placeholder={'密码'}
          secureTextEntry={true}
          value={this.props.password}
          onChangeText={(password) => this.props.setPassword(password)}
        />
        <AnimatedTouchableOpacity
          style={[
            styles.button,
            {transform: [{translateY: this.state.translateY}]},
          ]}
          onPress={this.onButtonPress}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <Text style={styles.buttonText}>登录</Text>
          )}
        </AnimatedTouchableOpacity>
      </View>
    );
  }
}
