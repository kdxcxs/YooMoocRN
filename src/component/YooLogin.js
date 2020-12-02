import React, {Component} from 'react';
import YooLoginUI from '../ui/YooLoginUI';
import CookieManager from '@react-native-community/cookies';
import {post} from '../api/HTTP';

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

  login(onFail) {
    post('http://eol.ctbu.edu.cn/meol/loginCheck.do', {
      headers: {
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        Origin: 'http://eol.ctbu.edu.cn',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'YooMooc',
        Referer:
          'http://eol.ctbu.edu.cn/meol/common/security/login.jsp?enterLid=46445',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7',
      },
      body:
        'logintoken=' +
        new Date().getTime() +
        '&enterLid=46445' +
        '&IPT_LOGINUSERNAME=' +
        this.state.username +
        '&IPT_LOGINPASSWORD=' +
        this.state.password,
    })
      .then((response) => {
        if (/<title>(.|\n)*用户登录(.|\n)*<\/title>/.test(response)) {
          onFail();
          CookieManager.clearAll();
        } else if (/<title>(.|\n)*网络课程(.|\n)*<\/title>/.test(response)) {
          this.props.gotoForum();
        }
      })
      .catch(onFail);
  }

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
