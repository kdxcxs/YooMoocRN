import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import YooSplashUI from '../ui/YooSplashUI';
import {gbkFetch} from '../api/HTTP';
import CookieManager from '@react-native-community/cookies';

export default class YooSplash extends Component {
  componentDidMount() {
    gbkFetch('POST', 'http://eol.ctbu.edu.cn/meol/loginCheck.do', {
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
    })
      .then((response) => {
        if (/<title>(.|\n)*用户登录(.|\n)*<\/title>/.test(response)) {
          this.props.gotoLogin();
          CookieManager.clearAll();
        } else if (/<title>(.|\n)*网络课程(.|\n)*<\/title>/.test(response)) {
          this.props.gotoForum();
        }
      })
      .catch(() => ToastAndroid.show('无法连接到服务器', ToastAndroid.SHORT));
  }

  render() {
    return <YooSplashUI />;
  }
}
