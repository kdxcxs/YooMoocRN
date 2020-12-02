import React, {useState} from 'react';
import {Image, StyleSheet, Animated} from 'react-native';

export function YooBackground() {
  const imgPosition = useState(new Animated.ValueXY())[0];
  const styles = StyleSheet.create({
    backgroundContainer: {
      transform: [{translateX: -1500}],
      position: 'absolute',
      zIndex: -1,
    },
  });
  setInterval(() => {
    Animated.timing(imgPosition, {
      toValue: {
        x: -Math.floor(Math.random() * 5000),
        y: -Math.floor(Math.random() * 3000),
      },
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, 10000);
  return (
    <Animated.View
      style={[
        styles.backgroundContainer,
        {transform: imgPosition.getTranslateTransform()},
      ]}>
      <Image
        source={require('../../assets/pawel-czerwinski-aelD0Zrmsy0-unsplash.jpg')}
      />
    </Animated.View>
  );
}
