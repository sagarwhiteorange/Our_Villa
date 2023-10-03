import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Styles from '../../Styles/Styles';
import Images from '../../Constant/Images';
import Strings from '../../Constant/Strings';
import * as Animatable from 'react-native-animatable';
import AppBg from '../../Common/AppBg';
import Colors from '../../Theme/Colors';
import { ForgotPassword } from '../../Api/Method';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import SuccessfullyMsg from '../../Common/SuccessfullyMsg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

enum Url {
  HomeCareOTP = 'HomeCareOTP',
}


const HomeCareForgotPassword = (props: any) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>() 

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)
  const [errorEmail, setErrorEmail] = useState('');
  const [EmailFocusBorder, setEmailFocusBorder] = useState('#FFF')
  const [EmailFocusIcon, setEmailFocusIcon] = useState(false)
  const [visible, setVisible] = useState(false)

  const handleEmailFocusIcon = () => { setEmailFocusIcon(!EmailFocusIcon) }

  const customFocusEmail = () => { setEmailFocusBorder('#03849C') }

  const customBlurEmail = () => { setEmailFocusBorder('#FFF') }

  const params = {
    email: email,
    user_type : 1,
  }

  const onForgotPassword = async() => {
    setLoading(true)
    const response = await ForgotPassword(params)
    setLoading(false)    
    if(response.status) {
      setVisible(true)
      setTimeout(() => {
        navigation.navigate('HomeCareOTP', {email: email})
      }, 3000);
    } else {
      setErrorEmail(response?.data?.ResponseData?.errors)
    }
  }

  const closeModal = () => {
    setVisible(false)
    navigation.navigate('HomeCareOTP', {email: email})
  }


  return (
    <>
    <AppBg />
    <ScrollView>
        <View style={Styles.marginHorizontal15}>
          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.mt60}>
            <Image source={Images.logo} style={Styles.loginBrand} />
          </Animatable.View>
          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.marginVertical20}>
            <Text style={[Styles.fontBlackMedium24, Styles.mb10, Styles.fontMedium24]}>{Strings.ForgotPassword}</Text>
            <Text style={[ Styles.fontBook14]}>{Strings.ForgotPasswordDescription}</Text>
          </Animatable.View>
          <View>
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.Phone}</Text>
            <View style={[Styles.formControl, { borderColor: EmailFocusBorder, borderWidth: 2 }]}>
              {!EmailFocusIcon ? <Image source={Images.email_gray} style={Styles.authIconWidth} /> : <Image source={Images.email_black} style={Styles.authIconWidth} />}
              <TextInput placeholder='johnsmith@gmail.com'
                style={[ Styles.CustomWidth, Styles.pl10, Styles.textBlack, Styles.fontBook14]}
                onFocus={customFocusEmail}
                onBlur={customBlurEmail}
                onPressIn={handleEmailFocusIcon}
                placeholderTextColor='#818D8E'
                keyboardType='default'
                value={email} 
                onChangeText={text => setEmail(text)}
              />
            </View>
          </View>
          {errorEmail && <Text style={[errorEmail ? Styles.mb20: null, Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>{errorEmail}</Text>}

          <TouchableOpacity onPress={onForgotPassword} style={Styles.btnBlue}>
            {loading ? <ActivityIndicator size='small' color='#FFF'/> :<Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.SignIn}</Text> }
          </TouchableOpacity>          

        </View>
    </ScrollView>

    <SuccessfullyMsg visible={visible}>
      <View style={{position: 'relative'}}>
        <TouchableOpacity style={{position: 'absolute', right: -35, top: -15}} onPress={closeModal}>
          <Image source={Images.fill_delete} style={{width: 38, height: 38}}/>
        </TouchableOpacity>
        <Image source={Images.alert_bg} style={{width: '100%', height: 132}}/>
        <View style={{alignItems: 'center'}}>
          <Image source={Images.alert_done} style={Styles.recentPic}/>
          <Text style={[Styles.fontBlackMedium24, Styles.marginVertical20, Styles.fontMedium24]}>Congratulations!</Text>
          <Text style={{fontFamily: 'GothamRounded-Book', fontWeight: '400', fontSize: 18, lineHeight: 25}}>{Strings.ForgetPasswordMsg}</Text>
        </View>
      </View>
    </SuccessfullyMsg>
    </>
  );
}

export default HomeCareForgotPassword;
