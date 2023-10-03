import React, { useEffect } from 'react';
import { View, Dimensions, Image } from 'react-native';
import Images from '../Constant/Images';
import Styles from '../Styles/Styles';
import AppBg from '../Common/AppBg';
import * as Animatable from 'react-native-animatable';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Splash = ({ navigation }: { navigation: any }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('UserSelect')
    }, 2000);

    return () => clearTimeout(timeout)
  }, [])

  return (
    <View style={Styles.flex1}>

      <AppBg />

      <Animatable.View duration={3000} animation="zoomInUp" style={Styles.flexCenter}>
        <Image source={Images.logo} resizeMode='cover' style={Styles.logo} />
      </Animatable.View>

      <Animatable.View duration={3000} animation="fadeInUp" style={Styles.flexEnd}>
        <Image source={Images.splash_image} resizeMode='cover' style={Styles.splashImg} />
      </Animatable.View>

    </View>
  );
}

export default Splash;


