import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import YooForumUI from '../ui/YooForumUI';
import {gbkFetch} from '../api/HTTP';
import CookieManager from '@react-native-community/cookies';
import * as cheerio from 'cheerio';

const ShowErrorToast = () =>
  ToastAndroid.show('获取数据时出错', ToastAndroid.SHORT);

export default class YooForum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hint: '准备中',
      topics: [],
      fetchedListPage: 0,
    };
    this.initForum = this.initForum.bind(this);
    this.getTopicList = this.getTopicList.bind(this);
  }

  componentDidMount() {
    this.props.bindInitializer(this);
  }

  initForum() {
    // get dwr session id
    gbkFetch(
      'POST',
      'http://eol.ctbu.edu.cn/meol/dwr/call/plaincall/__System.generateId.dwr',
      {
        headers: {
          Origin: 'http://eol.ctbu.edu.cn',
          'Content-Type': 'text/plain',
          'User-Agent': 'YooMooc',
          Referer:
            'http://eol.ctbu.edu.cn/meol/jpk/course/layout/newpage/index.jsp?courseId=46445',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7',
        },
        body:
          'callCount=1\n' +
          'c0-scriptName=__System\n' +
          'c0-methodName=generateId\n' +
          'c0-id=0\n' +
          'batchId=0\n' +
          'instanceId=0\n' +
          'page=%2Fmeol%2Fjpk%2Fcourse%2Flayout%2Fnewpage%2Findex.jsp%3FcourseId%3D46445\n' +
          'scriptSessionId=\n' +
          'windowName=\n',
      },
    )
      .then((response) => {
        if (/[^"]*"\);/.test(response)) {
          const exDate = new Date();
          exDate.setDate(exDate.getDate() + 1);
          CookieManager.set(
            'http://eol.ctbu.edu.cn/meol/jpk/course/layout/newpage/index.jsp?courseId=46445',
            {
              name: 'DWRSESSIONID',
              value: response.match(/[^"]*"\);/)[0].split('"')[0],
              domain: 'eol.ctbu.edu.cn',
              path: '/meol',
              version: '1',
              expires: exDate.toUTCString(),
            },
          ).then(() => {
            // it is needed to request some pages before getting the topic list
            // maybe the server is judging which course the user is
            gbkFetch(
              'GET',
              'http://eol.ctbu.edu.cn/meol/jpk/course/layout/newpage/index.jsp?courseId=46445',
              {
                headers: {
                  'Upgrade-Insecure-Requests': '1',
                  'User-Agent': 'YooMooc',
                },
              },
            )
              .then(() => {
                gbkFetch(
                  'GET',
                  'http://eol.ctbu.edu.cn/meol/jpk/course/layout/newpage/default_demonstrate.jsp',
                  {
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'YooMooc',
                    Referer:
                      'http://eol.ctbu.edu.cn/meol/jpk/course/layout/newpage/index.jsp?courseId=46445',
                  },
                )
                  .then(this.getTopicList)
                  .catch(ShowErrorToast);
              })
              .catch(ShowErrorToast);
          });
        } else {
          ShowErrorToast();
        }
      })
      .catch(ShowErrorToast);
  }

  getTopicList() {
    const page = this.state.fetchedListPage + 1;
    this.setState({hint: '获取数据中'});
    gbkFetch(
      'GET',
      `http://eol.ctbu.edu.cn/meol/common/faq/forum.jsp?viewtype=thread&forumid=102211&cateId=0&s_gotopage=${page}`,
      {
        headers: {
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'YooMooc',
          Referer:
            'http://eol.ctbu.edu.cn/meol/common/faq/forum.jsp?count=MODITIME&forumid=102211',
        },
      },
    ).then((response) => {
      const newTopics = [];
      const appendNewTopic = (threadID, title, owner) => {
        newTopics.push({threadID, title, owner});
      };
      const $ = cheerio.load(response, {ignoreWhitespace: true});
      $('td.left').each(function () {
        const current = $(this);
        appendNewTopic(
          current.children('a').attr('href').slice(20),
          current.text(),
          current.next().text(),
        );
      });
      this.setState({
        topics: [...this.state.topics, ...newTopics],
        hint: '',
        fetchedListPage: page,
      });
    });
  }

  render() {
    return <YooForumUI topics={this.state.topics} hint={this.state.hint} />;
  }
}
