import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Images from '../Constant/Images';
import Styles from '../Styles/Styles';
import AppBg from '../Common/AppBg';
import Strings from '../Constant/Strings';
import { Path, Svg } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const UserSelect = ({ navigation }: { navigation: any }) => {

  const [selectUser, setSelectUser] = useState(1)
  const [loading, setLoading] = useState(false)

 

  const UserSelect = async () => {
    setLoading(true)
    navigation.navigate('UserSlide')
    setLoading(false) 
  }

  const HomeCareSelect = async () => {
    setLoading(true)
    navigation.navigate('HomeCareSlide')
    setLoading(false) 
  }

 

 


  return (
    <View style={Styles.flex1}>
      <AppBg />
      <View style={[Styles.flex1,Styles.marginHorizontal15]}>
        
          <View style={Styles.flexJustifyCenter}>
            <Text style={[Styles.userTitle, Styles.fontBold30]}>{Strings.SelectUser}</Text>
          </View>

          <View style={Styles.flex3}>
            <TouchableOpacity onPress={() => setSelectUser(1)} activeOpacity={1}>
              <Animatable.View duration={3000} animation="fadeInUp" style={Styles.userCart}>
                {
                  selectUser === 1 ? <View style={Styles.radioButton}>
                    <Image source={Images.select_user} style={Styles.selectImg} />
                    <Text style={[Styles.absolute, Styles.top0, Styles.right0]}>
                      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <Path d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 
                        10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 
                        10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 
                        6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z" fill="white" />
                      </Svg>
                    </Text>
                  </View> : null
                }
                <View style={Styles.flexJustifyEnd}>
                  <Image source={Images.user} resizeMode='cover' style={Styles.userTypeImg} />
                </View>
                <View style={Styles.m10}>
                  <Text style={[Styles.fontBlack18, Styles.fontMedium18]}>{Strings.User}</Text>
                  <Text style={[Styles.fontBlack12, Styles.fontBook12]}>{Strings.UserDescription}</Text>
                </View>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectUser(2)} activeOpacity={1}>
              <Animatable.View duration={3000} animation="fadeInUp" style={Styles.userCart}>
                {
                  selectUser === 2 ? <View style={Styles.radioButton}>
                    <Image source={Images.select_user} style={Styles.selectImg} />
                    <Text style={[Styles.absolute, Styles.top0, Styles.right0]}>
                      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <Path d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 
                        10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 
                        10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 
                        6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z" fill="white" />
                      </Svg>
                    </Text>
                  </View> : null
                }
                <View style={Styles.flexJustifyEnd}>
                  <Image source={Images.home_care} resizeMode='cover' style={Styles.userTypeImg} />
                </View>
                <View style={Styles.m10}>
                  <Text style={[Styles.fontBlack18, Styles.fontMedium18]}>{Strings.HomeCare}</Text>
                  <Text style={[Styles.fontGray12, Styles.fontBook12]}>{Strings.HomeCareDescription}</Text>
                </View>
              </Animatable.View>
            </TouchableOpacity>

            

          </View>

          {selectUser === 1 ? 
            <TouchableOpacity onPress={UserSelect} style={Styles.btnBlue}>                
                {loading ? <ActivityIndicator size='small' color='#FFF'/> :<Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.Continue}</Text> }
            </TouchableOpacity> 
            : 
            <TouchableOpacity onPress={HomeCareSelect} style={Styles.btnBlue}>
              {loading ? <ActivityIndicator size='small' color='#FFF'/> :<Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.Continue}</Text> }
            </TouchableOpacity>
          }


        </View>
      
    </View>
  );
}

export default UserSelect;





