import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
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
    borderRadius: 100,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'mintcream',
    fontSize: 26,
  },
});

export default class YooLoginUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    if (!this.state.loading) {
      this.setState({loading: true});
      this.props.loginCallback();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder={'账号'}
          maxLength={10}
          value={this.props.username}
          onChangeText={(username) => this.props.setUsername(username)}
        />
        <TextInput
          style={styles.input}
          placeholder={'密码'}
          secureTextEntry={true}
          value={this.props.password}
          onChangeText={(password) => this.props.setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <Text style={styles.buttonText}>登录</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
