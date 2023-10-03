import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Styles from '../../Styles/Styles';
import Images from '../../Constant/Images';
import Strings from '../../Constant/Strings';
import * as Animatable from 'react-native-animatable';
import AppBg from '../../Common/AppBg';
import { ResetPassword } from '../../Api/Method';
import Colors from '../../Theme/Colors';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import SuccessfullyMsg from '../../Common/SuccessfullyMsg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoadingOverlay from './LoadingOverlay';

enum Url {
  UserSignIn = 'UserSignIn',
}

const UserNewPassword = (props: any) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()

  const [loading, setLoading] = useState(false)
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorResponseText, setErrorResponseText] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [visible, setVisible] = useState(false)

  const [PasswordFocusBorder, setPasswordFocusBorder] = useState('#FFF')
  const [ConfirmPasswordFocusBorder, setConfirmPasswordFocusBorder] = useState('#FFF')

  const [PasswordFocusIcon, setPasswordFocusIcon] = useState(false)
  const [ConfirmPasswordFocusIcon, setConfirmPasswordFocusIcon] = useState(false)


  const handlePasswordFocusIcon = () => { setPasswordFocusIcon(!PasswordFocusIcon) }
  const handleConfirmPasswordFocusIcon = () => { setConfirmPasswordFocusIcon(!ConfirmPasswordFocusIcon) }

  const customFocusPassword = () => { setPasswordFocusBorder('#03849C') }
  const customFocusConfirmPassword = () => { setConfirmPasswordFocusBorder('#03849C') }

  const customBlurPassword = () => { setPasswordFocusBorder('#FFF') }
  const customBlurConfirmPassword = () => { setConfirmPasswordFocusBorder('#FFF') }

  const PressVisiblePassword = () => {
    setShowPassword(!showPassword)
  }
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const email = props.route.params.email
  

  

  const onNewPasswordVerification = async() => {

    setErrorPassword('')
    setErrorConfirmPassword('')
    let hasError = false;

    if(Password.length < 8){
      setErrorPassword('The password should be at least 8 characters long.')
      hasError = true
    } 
    if(ConfirmPassword !== Password){
      setErrorConfirmPassword('Confirm password and password did not match')
      hasError = true
    }
    
    if(hasError) {
      return
    }

    const params = {
      email: email,
      new_password: Password,
      confirm_password: ConfirmPassword
    }

    setLoading(true)
    const response = await ResetPassword(params)
    setErrorResponseText(response?.data?.ResponseText)  
    setLoading(false)    
    if(response.status) {
      setVisible(true)
      setTimeout(() => {
        navigation.navigate('UserSignIn', {email: email})
      }, 3000);
    } else {
      console.log('Error Message =====>', response)
      setErrorPassword(response?.data?.ResponseData?.errors[0])
      setErrorConfirmPassword(response?.data?.ResponseData?.errors[1])
    }
  }

  const closeModal = () => {
    setVisible(false)
    navigation.navigate('UserSignIn', {email: email})
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setPassword('')
      setConfirmPassword('')
    });
    return unsubscribe;
  }, [navigation])

  return (
    <>
    <ScrollView>

      <AppBg/>

        <View style={Styles.marginHorizontal15}>

          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.mt60}>
            <Image source={Images.logo} style={Styles.loginBrand} />
          </Animatable.View>

          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.marginVertical20}>
            <Text style={[Styles.fontBlackMedium24, Styles.mb10,Styles.fontMedium24]}>{Strings.NewPassword}</Text>
            <Text style={[ Styles.fontBook14]}>{Strings.NewPasswordDescription}</Text>
          </Animatable.View>

          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16]}>{Strings.Password}</Text>
            <View style={[Styles.formControl, { borderColor: PasswordFocusBorder, borderWidth: 2 }]}>
              <View style={Styles.alignCenter}>

                {!PasswordFocusIcon ? 
                  <Image source={Images.password_gray} style={Styles.authIconWidth} /> 
                  : 
                  <Image source={Images.password_black} style={Styles.authIconWidth} />
                }

                <TextInput placeholder='Enter password'
                  style={[ Styles.CustomWidth,Styles.fontBook14, Styles.pl10, Styles.textBlack]}
                  onFocus={customFocusPassword}
                  onBlur={customBlurPassword}
                  onPressIn={handlePasswordFocusIcon}
                  placeholderTextColor='#818D8E'
                  secureTextEntry={!showPassword}
                  keyboardType='default'
                  value={Password}
                  onChangeText={text => setPassword(text)}
                />
              </View>

              <TouchableOpacity onPress={PressVisiblePassword}>
                {showPassword ?
                  <Image source={Images.eye_show} style={Styles.authIconWidth} /> 
                  : 
                  <Image source={Images.eye_hide} style={Styles.authIconWidth} />
                }
              </TouchableOpacity>

            </View>

            {errorPassword && 
              <Text style={[errorPassword ? Styles.mb20: null, 
               Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>
                {errorPassword}
              </Text>
            }

          </View>

          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16]}>{Strings.ConfirmPassword}</Text>
            <View style={[Styles.formControl, { borderColor: ConfirmPasswordFocusBorder, borderWidth: 2 }]}>
              <View style={Styles.alignCenter}>

                {!ConfirmPasswordFocusIcon ? 
                  <Image source={Images.password_gray} style={Styles.authIconWidth} /> 
                  : 
                  <Image source={Images.password_black} style={Styles.authIconWidth} />
                }

                <TextInput placeholder='Enter password'
                  style={[ Styles.CustomWidth, Styles.pl10, Styles.textBlack, Styles.fontBook14]}
                  onFocus={customFocusConfirmPassword}
                  onBlur={customBlurConfirmPassword}
                  onPressIn={handleConfirmPasswordFocusIcon}
                  placeholderTextColor='#818D8E'
                  secureTextEntry={!showPassword}
                  keyboardType='default'
                  value={ConfirmPassword}
                  onChangeText={text => setConfirmPassword(text)}
                />
              </View>

              <TouchableOpacity onPress={PressVisiblePassword}>
                {showPassword ?
                  <Image source={Images.eye_show} style={Styles.authIconWidth} /> 
                  : 
                  <Image source={Images.eye_hide} style={Styles.authIconWidth} />
                }
              </TouchableOpacity>
            </View>

            {errorConfirmPassword && 
              <Text style={[errorConfirmPassword ? Styles.mb20: null, 
               Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>
                {errorConfirmPassword}
              </Text>
            }

          {errorResponseText ? 
            <Text style={[errorResponseText ? Styles.mb20: null, Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>{errorResponseText}</Text>
            :
            null
          }
            
          </View>

          {
            Password && ConfirmPassword ?            
            <TouchableOpacity onPress={onNewPasswordVerification} style={Styles.btnBlue}>
             <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.ConfirmPassword}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity disabled={true} style={[Styles.btnDisable, Styles.mt20]}>
              <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.ConfirmPassword}</Text>
            </TouchableOpacity>
          }

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
          <Text style={{fontFamily: 'GothamRounded-Book', fontWeight: '400', fontSize: 18, lineHeight: 25}}>{Strings.ResetPasswordMsg}</Text>
        </View>

      </View>
      
    </SuccessfullyMsg>

    <LoadingOverlay visible={loading}/>
    </>
  );
}

export default UserNewPassword;
