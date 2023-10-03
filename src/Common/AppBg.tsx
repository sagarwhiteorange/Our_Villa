import React from 'react';
import { ImageBackground, StyleSheet, Dimensions } from 'react-native';
import Images from '../Constant/Images';

const AppBg = () => {
  return (
      <ImageBackground source={Images.app_bg} style={styles.backgroundImage}/>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: Dimensions.get('screen').height,
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0
  },
});

export default AppBg;
