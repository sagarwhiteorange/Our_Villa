import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import Styles from '../../Styles/Styles';
import * as Animatable from 'react-native-animatable';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Strings from '../../Constant/Strings';
import Images from '../../Constant/Images';
import AppBg from '../../Common/AppBg';


enum Url {
  HomeCareSignIn = 'HomeCareSignIn',
}

const HomeCareSlide = () => {  

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()

  return (
    <>
    <AppBg />
        <Onboarding
          showSkip={false}
          showNext={false}
          showPagination={false}
          pages={[
            {
              backgroundColor: 'transparent',
              title: '',
              subtitle: '',
              image: (
                <View>
                  <TouchableOpacity style={[Styles.Skip, {marginTop: 30}]} onPress={() => navigation.navigate('HomeCareSignIn')}>
                    <Text style={[Styles.fontBlue14]}>{Strings.Skip}</Text>
                  </TouchableOpacity>
                  <Animatable.View duration={3000} animation="fadeInDown" style={[Styles.OnBoardingImgView, {marginTop: 80}]}>
                    <Image source={Images.onboarding_four} style={[Styles.OnBoardingImg, Styles.width1_2]} resizeMode='contain' />
                  </Animatable.View>
                  <View style={[Styles.OnBoardingTextView, {marginTop: 30}]}>
                    <Text style={[Styles.fontBlack24, Styles.fontBold24]}>{Strings.BoardingTitleFour}</Text>
                    <Text style={[Styles.fontGray16, Styles.fontBook16]}>{Strings.BoardingFourDescription}</Text>
                    <View style={[Styles.alignSelfCenter, {marginTop: 80}]}>
                      <Image
                        source={Images.step4}
                        style={{ width: 150, height: 150 }}
                      />
                    </View>
                  </View>
                </View>
              ),
            },
            {
              backgroundColor: 'transparent',
              title: '',
              subtitle: '',
              image: (
                <View>
                  <Animatable.View duration={3000} animation="fadeInDown" style={[Styles.OnBoardingImgView, {marginTop: 80}]}>
                    <Image source={Images.onboarding_five} style={[Styles.OnBoardingImg, Styles.width1_2]} resizeMode='contain' />
                  </Animatable.View>
                  <View style={[Styles.OnBoardingTextView, {marginTop: 30}]}>
                    <Text style={[Styles.fontBlack24, Styles.fontBold24]}>{Strings.BoardingTitleFive}</Text>
                    <Text style={[Styles.fontGray16, Styles.fontBook16]}>{Strings.BoardingFiveDescription}</Text>
                    <TouchableOpacity style={[Styles.alignSelfCenter, {marginTop: 80}]} onPress={() => navigation.navigate('HomeCareSignIn')}>
                      <Image
                        source={Images.step5}
                        style={{ width: 150, height: 150 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ),
            },
          ]}
        />
    </>
  );
}

export default HomeCareSlide;
