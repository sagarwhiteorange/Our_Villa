import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Images from '../../Constant/Images';
import Strings from '../../Constant/Strings';
import Styles from '../../Styles/Styles';
import AppBg from '../../Common/AppBg';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: Images.onboarding_four,
    title: Strings.BoardingTitleFour,
    subtitle: Strings.BoardingFourDescription,
  },
  {
    id: '2',
    image: Images.onboarding_five,
    title: Strings.BoardingTitleFive,
    subtitle: Strings.BoardingFiveDescription,
  },
];

const Slide = ({ item }: {item: any}) => {
  return (
        <View style={{position: 'relative', zIndex: 99,}}>
          <View style={[Styles.OnBoardingImgView, { marginTop: 80 }]}>
            <Image source={item?.image} style={[Styles.OnBoardingImg, Styles.width1_2]} resizeMode='contain' />
          </View>
          <View style={[Styles.OnBoardingTextView, { marginTop: 50 }]}>
            <Text style={[Styles.fontBlack24, Styles.fontBold24]}>{item?.title}</Text>
            <Text style={[Styles.fontGray16, Styles.fontBook16]}>{item?.subtitle}</Text>
          </View>
        </View>
  );
};

const HomeCareSlide = ({ navigation } : {navigation: any}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
        <View style={{ marginBottom: 20, position: 'absolute', width: '100%', height: '100%'}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{width: '100%', height: '100%'}}>
              <TouchableOpacity
                style={[Styles.alignSelfCenter, {marginTop: 80,position: 'absolute', bottom: 20,}]}
                onPress={() => navigation.replace('HomeCareSignIn')}>
                <Image source={Images.step5} style={{ width: 150, height: 150 }} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{width: '100%', height: '100%'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{position: 'absolute', top: 20, right: 20,}}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                style={[Styles.alignSelfCenter, {marginTop: 80, position: 'absolute', bottom: 20,}]}
                activeOpacity={0.8}
                onPress={goToNextSlide}>
                <Image source={Images.step4} style={{ width: 150, height: 150 }} />
              </TouchableOpacity>
            </View>
          )}
        </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <AppBg />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75, position: 'relative' }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};


export default HomeCareSlide;