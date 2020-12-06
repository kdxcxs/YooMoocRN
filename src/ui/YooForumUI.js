import React, {Component, createRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Animated,
  Dimensions,
  Pressable,
  BackHandler,
} from 'react-native';
import YooForumTopic from '../component/YooForumTopic';
import YooReply from './YooReply';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const styles = StyleSheet.create({
  container: {
    width: screenWidth * 2,
  },
  repliesContainer: {
    position: 'absolute',
    left: screenWidth,
    width: screenWidth,
    height: screenHeight - 124,
  },
  hintContainer: {
    flex: 1,
    alignItems: 'center',
    left: -screenWidth / 2,
  },
  logo: {
    marginTop: 120,
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  hint: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  indicator: {
    marginTop: 64,
  },
  showMoreText: {
    fontSize: 18,
    margin: 8,
  },
});

function ForumTopic(props) {
  return props.topics.map((topic, key) => (
    <YooForumTopic
      key={key}
      topic={topic}
      showDetail={props.showDetail}
      hideDetail={props.hideDetail}
    />
  ));
}

function ShowMore(props) {
  return (
    <Pressable
      style={{width: screenWidth, alignItems: 'center'}}
      onPress={() => props.getTopicList()}>
      {props.gettingTopicList ? (
        <Text style={styles.showMoreText}>加载中</Text>
      ) : (
        <Text style={styles.showMoreText}>加载更多</Text>
      )}
    </Pressable>
  );
}

export default class YooForumUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      currentPosition: 0,
      translateX: new Animated.Value(0),
      currentReplies: [],
      replyTranslateY: new Animated.Value(0),
    };
    this.replyRef = createRef();
    this.showDetail = this.showDetail.bind(this);
    this.hideDetail = this.hideDetail.bind(this);
    this.handleAndroidBack = this.handleAndroidBack.bind(this);
    this.currentForumTopicUI = null;
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleAndroidBack,
    );
  }

  handleAndroidBack() {
    if (this.currentForumTopicUI){
      this.hideDetail();
      return true;
    }
  }

  showDetail(ForumTopicUI) {
    this.currentForumTopicUI = ForumTopicUI;
    this.replyRef.current.scrollTo({x: 0, y: 0, animated: false});
    this.setState({
      scrollEnabled: false,
      currentReplies: this.currentForumTopicUI.props.replies,
    });
    this.state.replyTranslateY.setValue(
      this.state.currentPosition +
        this.currentForumTopicUI.state.layoutHeight +
        screenHeight,
    );
    Animated.parallel([
      Animated.timing(this.currentForumTopicUI.state.translate, {
        toValue: {
          x: screenWidth,
          y:
            this.state.currentPosition -
            this.currentForumTopicUI.state.layoutY +
            8,
        },
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.translateX, {
        toValue: -screenWidth,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.replyTranslateY, {
        toValue:
          this.state.currentPosition +
          this.currentForumTopicUI.state.layoutHeight +
          8,
        duration: 250,
        delay: 250,
        useNativeDriver: true,
      }),
    ]).start(this.currentForumTopicUI.onAnimationFinished);
  }

  hideDetail() {
    this.setState({scrollEnabled: true});
    Animated.parallel([
      Animated.timing(this.currentForumTopicUI.state.translate, {
        toValue: {
          x: 0,
          y: 0,
        },
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.replyTranslateY, {
        toValue: this.state.currentPosition + 100 + screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(
      function () {
        this.currentForumTopicUI.onAnimationFinished();
        this.currentForumTopicUI = null;
      }.bind(this),
    );
  }

  render() {
    return (
      <AnimatedScrollView
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: this.state.translateX,
              },
            ],
          },
        ]}
        scrollEnabled={this.state.scrollEnabled}
        onScroll={(event) =>
          this.setState({currentPosition: event.nativeEvent.contentOffset.y})
        }>
        {this.props.hint === '' ? (
          <View>
            <ForumTopic
              topics={this.props.topics}
              showDetail={this.showDetail}
              hideDetail={this.hideDetail}
            />
            <ShowMore
              getTopicList={this.props.getTopicList}
              gettingTopicList={this.props.gettingTopicList}
            />
          </View>
        ) : (
          <View style={styles.hintContainer}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
            />
            <Text style={styles.hint}>{this.props.hint}</Text>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.indicator}
            />
          </View>
        )}
        <AnimatedScrollView
          ref={this.replyRef}
          style={[
            styles.repliesContainer,
            {transform: [{translateY: this.state.replyTranslateY}]},
          ]}>
          {this.state.currentReplies.map((reply, key) => (
            <YooReply key={key} reply={reply} />
          ))}
        </AnimatedScrollView>
      </AnimatedScrollView>
    );
  }
}
