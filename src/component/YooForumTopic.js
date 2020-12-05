import React, {Component} from 'react';
import YooForumTopicUI from '../ui/YooForumTopicUI';
import {gbkFetch} from '../api/HTTP';
import * as cheerio from 'cheerio';

export default class YooForumTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: [],
    };
    this.getReplies = this.getReplies.bind(this);
  }

  componentDidMount() {
    this.getReplies();
  }

  getReplies() {
    gbkFetch(
      'GET',
      `http://eol.ctbu.edu.cn/meol/common/faq/thread.jsp?threadid=${this.props.topic.threadID}`,
      {
        headers: 'YooMooc',
      },
    ).then((response) => {
      const newReplies = [];
      const appendReply = (username, content) => {
        newReplies.push({username, content});
      };
      const $ = cheerio.load(response, {ignoreWhitespace: true});
      $('input[type=hidden]').each(function () {
        const current = $(this);
        const currentUserInfo = current.parent().parent().parent().parent();
        if (currentUserInfo.html().slice(2, 4) === 'td') {
          appendReply(
            currentUserInfo.find('h6').text().split(' ')[1],
            cheerio.load(current.attr('value')).text(),
          );
        }
      });
      this.setState({replies: [...this.state.replies, ...newReplies]});
    });
  }

  render() {
    return (
      <YooForumTopicUI
        topic={this.props.topic}
        showDetail={this.props.showDetail}
        hideDetail={this.props.hideDetail}
        replies={this.state.replies}
      />
    );
  }
}
