import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export function YooBackground() {
  const styles = StyleSheet.create({
    backgroundContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: -1,
    },
  });
  return (
    <View style={styles.backgroundContainer}>
      <Image
        source={require('../../assets/pawel-czerwinski-aelD0Zrmsy0-unsplash.jpg')}
      />
    </View>
  );
}
