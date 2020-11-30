import React, {Component} from 'react';
import YooLoginUI from '../ui/YooLoginUI';

export default class YooLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.login = this.login.bind(this);
  }

  setUsername(value) {
    this.setState({username: value});
  }

  setPassword(value) {
    this.setState({password: value});
  }

  login(onFail) {}

  render() {
    return (
      <YooLoginUI
        username={this.state.username}
        password={this.state.password}
        setUsername={this.setUsername}
        setPassword={this.setPassword}
        loginCallback={this.login}
      />
    );
  }
}
