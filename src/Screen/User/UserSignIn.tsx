import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Styles from '../../Styles/Styles';
import Images from '../../Constant/Images';
import Strings from '../../Constant/Strings';
import * as Animatable from 'react-native-animatable';
import AppBg from '../../Common/AppBg';
import Colors from '../../Theme/Colors';
import { login } from '../../Api/Method';
import { AsyncStorageSetUserID, setToken} from '../../Api/PreferenceData';
import SuccessfullyMsg from '../../Common/SuccessfullyMsg';
import LoadingOverlay from './LoadingOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserSignIn = ({ navigation }: { navigation: any }) => {

  const [showPassword, setShowPassword] = useState(false)
  const [EmailFocusBorder, setEmailFocusBorder] = useState('#FFF')
  const [PasswordFocusBorder, setPasswordFocusBorder] = useState('#FFF')
  const [EmailFocusIcon, setEmailFocusIcon] = useState(false)
  const [PasswordFocusIcon, setPasswordFocusIcon] = useState(false)
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [errorResponseText, setErrorResponseText] = useState('')

  const handleEmailFocusIcon = () => {
    setEmailFocusIcon(!EmailFocusIcon)
  }

  const handlePasswordFocusIcon = () => {
    setPasswordFocusIcon(!PasswordFocusIcon)
  }

  const customFocusEmail = () => {
    setEmailFocusBorder('#03849C')
  }

  const customBlurEmail = () => {
    setEmailFocusBorder('#FFF')
  }

  const customFocusPassword = () => {
    setPasswordFocusBorder('#03849C')
  }

  const customBlurPassword = () => {
    setPasswordFocusBorder('#FFF')
  }

  const PressVisiblePassword = () => {
    setShowPassword(!showPassword)
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    setErrorEmail('')
    setErrorPassword('')
    let hasError = false;

    if (!isValidEmail(Email)) {
      setErrorEmail('Email is not valid format')
      hasError = true
    } 
    if (Password.length < 8) {
      setErrorPassword('The password should be at least 8 characters long.')
      hasError = true
    } 

    if(hasError) {
      return
    }

    const params = {
      device_token: "0",
      device_type: "0",
      email: Email,
      password: Password,
      user_type: "0",
    }

    try {
      setLoading(true)
      const response = await login(params)
      console.log('API response', JSON.stringify(response));
      setErrorResponseText(response?.data?.ResponseText)    
      setLoading(false)
      if (response.status) {
        if (response?.data?.ResponseData?.token) {
          setToken(response?.data?.ResponseData?.token)
          const UserID = response?.data?.ResponseData?.user?.id
          if(UserID !== null && UserID !== undefined){
            await AsyncStorage.setItem('UserID', UserID.toString())
            console.log('UserID ========================>', UserID);            
          }
          console.log('token ===>', response?.data?.ResponseData?.token);
          setVisible(true)
          setTimeout(() => {
            navigation.navigate('Category')
          }, 3000);
        }
        
        console.log('response.status true =====>', response)
      }
    } catch (response) {
      console.log('response.status false =====>', response)
      
    }
  }


  const closeModal = () => {
    setVisible(false)
    navigation.navigate('Category', { user_type: 0 })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setEmail('')
      setPassword('')
      setErrorEmail('')
      setErrorPassword('')
      setErrorResponseText('')
      setVisible(false)
    });
    return unsubscribe;
  }, [navigation])


  return (
    <>

      <AppBg />

      <ScrollView>

        <View style={Styles.marginHorizontal15}>

          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.mt48}>
            <Image source={Images.logo} style={Styles.loginBrand} />
          </Animatable.View>

          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.marginVertical20}>
            <Text style={[Styles.fontBlackMedium24, Styles.mb10, Styles.fontMedium24]}>{Strings.WelcomeTitle}</Text>
            <Text style={[Styles.fontBook14]}>{Strings.WelcomeDescription}</Text>
          </Animatable.View>

          <View style={Styles.mb10}>

            <Text style={[Styles.fontBlack16, Styles.fontBook16]}>{Strings.Email}</Text>

            <View style={[Styles.formControl, { borderColor: EmailFocusBorder, borderWidth: 2 }]}>

              {!EmailFocusIcon ?
                <Image source={Images.email_gray} style={Styles.authIconWidth} />
                :
                <Image source={Images.email_black} style={Styles.authIconWidth} />
              }

              <TextInput placeholder='johnsmith@gmail.com'
                style={[Styles.CustomWidth, Styles.pl10, Styles.textBlack, Styles.fontBook14]}
                onFocus={customFocusEmail}
                onBlur={customBlurEmail}
                onPressIn={handleEmailFocusIcon}
                placeholderTextColor='#818D8E'
                keyboardType='email-address'
                value={Email}
                onChangeText={text => setEmail(text)}
              />
            </View>

            {errorEmail ?
              <Text style={[errorEmail ? Styles.mb20 : null,
              Styles.fontBlack16, Styles.fontBook16, { color: Colors.textDanger }]}>
                {errorEmail}
              </Text>
              :
              null
            }

            {errorResponseText ?
              <Text style={[errorResponseText ? Styles.mb20 : null, Styles.fontBlack16, Styles.fontBook16, { color: Colors.textDanger }]}>{errorResponseText}</Text>
              :
              null
            }


          </View>

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
                  style={[Styles.CustomWidth, Styles.fontBook14, Styles.pl10, Styles.textBlack]}
                  onFocus={customFocusPassword}
                  onBlur={customBlurPassword}
                  onPressIn={handlePasswordFocusIcon}
                  placeholderTextColor='#818D8E'
                  secureTextEntry={!showPassword}
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

            {errorPassword ?
              <Text style={[errorPassword ? Styles.mb20 : null, Styles.fontBlack16, Styles.fontBook16, { color: Colors.textDanger }]}>{errorPassword}</Text>
              :
              null
            }

            {errorResponseText ?
              <Text style={[errorResponseText ? Styles.mb20 : null, Styles.fontBlack16, Styles.fontBook16, { color: Colors.textDanger }]}>{errorResponseText}</Text>
              :
              null
            }





          </View>

          <TouchableOpacity style={[Styles.alignSelfEnd, Styles.mb40]}
            onPress={() => navigation.navigate('UserForgotPassword')}>
            <Text style={[Styles.fontBlack14, Styles.fontBook14]}>{Strings.ForgotPassword}</Text>
          </TouchableOpacity>

          {
            Email && Password ?
            <TouchableOpacity onPress={handleSignIn} style={Styles.btnBlue}>            
                <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.SignIn}</Text> 
            </TouchableOpacity>
            : 
            <TouchableOpacity disabled={true} style={[Styles.btnDisable, Styles.mt20]}>
              <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.SignIn}</Text>
            </TouchableOpacity>
          }


          <View style={[Styles.alignSelfCenter, Styles.mt30]}>
            <Text style={[Styles.fontBook14]}>{Strings.ContinueWith}</Text>
          </View>

          <View style={[Styles.flexRow, Styles.marginVertical20]}>

            <TouchableOpacity style={Styles.socialIconBox}>
              <Image source={Images.google} style={Styles.socialIconGoogle} />
            </TouchableOpacity>

            <TouchableOpacity style={Styles.socialIconBox}>
              <Image source={Images.facebook} style={Styles.socialIconFacebook} />
            </TouchableOpacity>

          </View>

          <View style={[Styles.flexRow, Styles.mb10]}>
            <Text style={[Styles.fontBook14]}>{Strings.HaveAccount}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserSignUp')}>
              <Text style={[Styles.fontBlue14, Styles.pl10]}>{Strings.SignUp}</Text>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>

      <SuccessfullyMsg visible={visible}>
        <View style={{ position: 'relative' }}>

          <TouchableOpacity style={{ position: 'absolute', right: -35, top: -15 }} onPress={closeModal}>
            <Image source={Images.fill_delete} style={{ width: 38, height: 38 }} />
          </TouchableOpacity>

          <Image source={Images.alert_bg} style={{ width: '100%', height: 132 }} />

          <View style={{ alignItems: 'center' }}>
            <Image source={Images.alert_done} style={Styles.recentPic} />
            <Text style={[Styles.fontBlackMedium24, Styles.marginVertical20, Styles.fontMedium24]}>Congratulations!</Text>
            <Text style={{ fontFamily: 'GothamRounded-Book', fontWeight: '400', fontSize: 18, lineHeight: 25 }}>{Strings.LoginMsg}</Text>
          </View>

        </View>

      </SuccessfullyMsg>

      <LoadingOverlay visible={loading}/>
    </>
  );
}


export default UserSignIn;
