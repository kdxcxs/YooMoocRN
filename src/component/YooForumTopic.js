import React, {Component} from 'react';
import YooForumTopicUI from '../ui/YooForumTopicUI';

export default class YooForumTopic extends Component {
  render() {
    return (
      <YooForumTopicUI
        topic={this.props.topic}
        showDetail={this.props.showDetail}
        hideDetail={this.props.hideDetail}
      />
    );
  }
}
