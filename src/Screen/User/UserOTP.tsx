import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Styles from '../../Styles/Styles';
import Images from '../../Constant/Images';
import Strings from '../../Constant/Strings';
import * as Animatable from 'react-native-animatable';
import AppBg from '../../Common/AppBg';
import { VerifyOTP } from '../../Api/Method';
import Colors from '../../Theme/Colors';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import SuccessfullyMsg from '../../Common/SuccessfullyMsg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoadingOverlay from './LoadingOverlay';


enum Url {
  UserNewPassword = 'UserNewPassword',
}

const UserOTP = (props: any) => {
  
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()
  const [loading, setLoading] = useState(false)
  const [OTPError, setOTPError] = useState('')
  const [visible, setVisible] = useState(false)

  const [OTPOne, setOTPOne] = useState<string>()
  const [OTPTwo, setOTPTwo] = useState<string>()
  const [OTPThree, setOTPThree] = useState<string>()
  const [OTPFour, setOTPFour] = useState<string>()
  const [OTPFive, setOTPFive] = useState<string>()
  const [OTPSix, setOTPSix] = useState<string>()
  const [errorResponseText, setErrorResponseText] = useState('')

  const [OTPOneFocusBorder, setOTPOneFocusBorder] = useState('#FFF')
  const [OTPTwoFocusBorder, setOTPTwoFocusBorder] = useState('#FFF')
  const [OTPThreeFocusBorder, setOTPThreeFocusBorder] = useState('#FFF')
  const [OTPFourFocusBorder, setOTPFourFocusBorder] = useState('#FFF')
  const [OTPFiveFocusBorder, setOTPFiveFocusBorder] = useState('#FFF')
  const [OTPSixFocusBorder, setOTPSixFocusBorder] = useState('#FFF')

  const customFocusOTPOne = () => { setOTPOneFocusBorder('#03849C') }
  const customFocusOTPTwo = () => { setOTPTwoFocusBorder('#03849C') }
  const customFocusOTPThree = () => { setOTPThreeFocusBorder('#03849C') }
  const customFocusOTPFour = () => { setOTPFourFocusBorder('#03849C') }
  const customFocusOTPFive = () => { setOTPFiveFocusBorder('#03849C') }
  const customFocusOTPSix = () => { setOTPSixFocusBorder('#03849C') }

  const customBlurOTPOne = () => { setOTPOneFocusBorder('#FFF') }
  const customBlurOTPTwo = () => { setOTPTwoFocusBorder('#FFF') }
  const customBlurOTPThree = () => { setOTPThreeFocusBorder('#FFF') }
  const customBlurOTPFour = () => { setOTPFourFocusBorder('#FFF') }
  const customBlurOTPFive = () => { setOTPTwoFocusBorder('#FFF') }
  const customBlurOTPSix = () => { setOTPSixFocusBorder('#FFF') }

  const pin1Ref: any = useRef(null)
  const pin2Ref: any = useRef(null)
  const pin3Ref: any = useRef(null)
  const pin4Ref: any = useRef(null)
  const pin5Ref: any = useRef(null)
  const pin6Ref: any = useRef(null)

  
  
  const otp = (OTPOne ?? '') + (OTPTwo ?? '') + (OTPThree ?? '') + (OTPFour ?? '') + (OTPFive ?? '') + (OTPSix ?? '')
  const email = props.route.params.email
  

   

  const confirmCode = async() => {

    const params = {
      email: email,
      otp: otp
    }

    setLoading(true)
    const response = await VerifyOTP(params)
    setErrorResponseText(response?.data?.ResponseText) 
    setLoading(false)    
    if(response.status) {
      setVisible(true)
      setTimeout(() => {
        navigation.navigate('UserNewPassword', {email: email})
      }, 3000);
    } else {
      console.log('Error Message =====>', response.status)
      setOTPError(response?.data?.ResponseData?.errors)
    }
    
  }

  const closeModal = () => {
    setVisible(false)
    navigation.navigate('UserNewPassword', {email: email}) 
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setOTPOne('')
      setOTPTwo('')
      setOTPThree('')
      setOTPFour('')
      setOTPFive('')
      setOTPSix('')
    });
    return unsubscribe;
  }, [navigation])

 

  return (
    <>
    <AppBg />

    <ScrollView>

        <View style={Styles.marginHorizontal15}>

          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.mt60}>
            <Image source={Images.logo} style={Styles.loginBrand} />
          </Animatable.View>

          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.marginVertical20}>
            <Text style={[Styles.fontBlackMedium24, Styles.mb10, Styles.fontMedium24]}>{Strings.EnterOTP}</Text>
            <Text style={[ Styles.fontBook14]}>{Strings.EnterOTPDescription}</Text>
          </Animatable.View>

          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16]}>{Strings.Email}</Text>
            <View style={[Styles.flexRow, Styles.w80]}>              
              <View style={[Styles.formControl, { marginRight: 6, borderColor: OTPOneFocusBorder, borderWidth: 2 }]}>
                <TextInput placeholder='0' keyboardType='number-pad' autoFocus={true}
                  onFocus={customFocusOTPOne}
                  onBlur={customBlurOTPOne}
                  value={OTPOne}
                  onChangeText={(OTPOne) => {
                    setOTPOne(OTPOne)
                    if(OTPOne !== null) {
                      pin2Ref.current.focus()
                    }
                  }}
                  placeholderTextColor='#818D8E'
                  maxLength={1}
                  ref={pin1Ref}                
                  style={[ Styles.OTPBox, Styles.fontBook14]}   
                />
              </View>

              <View style={[Styles.formControl, { marginRight: 6, borderColor: OTPTwoFocusBorder, borderWidth: 2 }]}>
                <TextInput placeholder='0' keyboardType='number-pad'
                  onFocus={customFocusOTPTwo}
                  onBlur={customBlurOTPTwo}
                  value={OTPTwo}
                  onChangeText={(OTPTwo) => {
                    setOTPTwo(OTPTwo)
                    if(OTPTwo !== null) {
                      pin3Ref.current.focus()
                    }
                  }}
                  placeholderTextColor='#818D8E'
                  maxLength={1} style={[ Styles.OTPBox, Styles.fontBook14]} 
                  ref={pin2Ref} 
                />
              </View>

              <View style={[Styles.formControl, { marginRight: 6, borderColor: OTPThreeFocusBorder, borderWidth: 2 }]}>
                <TextInput placeholder='0' keyboardType='number-pad'
                  onFocus={customFocusOTPThree}
                  onBlur={customBlurOTPThree}
                  value={OTPThree}
                  onChangeText={(OTPThree) => {
                    setOTPThree(OTPThree)
                    if(OTPThree !== null) {
                      pin4Ref.current.focus()
                    }
                  }}
                  placeholderTextColor='#818D8E'
                  maxLength={1} style={[ Styles.OTPBox, Styles.fontBook14]} 
                  ref={pin3Ref} 
                />
              </View>

              <View style={[Styles.formControl, { marginRight: 6, borderColor: OTPFourFocusBorder, borderWidth: 2 }]}>
                <TextInput placeholder='0' keyboardType='number-pad'
                  onFocus={customFocusOTPFour}
                  onBlur={customBlurOTPFour}
                  value={OTPFour}
                  onChangeText={(OTPFour) => {
                    setOTPFour(OTPFour)
                    if(OTPFour !== null) {
                      pin5Ref.current.focus()
                    }
                  }}
                  placeholderTextColor='#818D8E'
                  maxLength={1} style={[ Styles.OTPBox, Styles.fontBook14]} 
                  ref={pin4Ref} 
                  />
              </View>

              <View style={[Styles.formControl, { marginRight: 6, borderColor: OTPFiveFocusBorder, borderWidth: 2 }]}>
                <TextInput placeholder='0' keyboardType='number-pad'
                  onFocus={customFocusOTPFive}
                  onBlur={customBlurOTPFive}
                  value={OTPFive}
                  onChangeText={(OTPFive) => {
                    setOTPFive(OTPFive)
                    if(OTPFive !== null) {
                      pin6Ref.current.focus()
                    }
                  }}
                  placeholderTextColor='#818D8E'
                  maxLength={1} style={[ Styles.OTPBox, Styles.fontBook14]} 
                  ref={pin5Ref} 
                  />
              </View>

              <View style={[Styles.formControl, { marginRight: 6, borderColor: OTPSixFocusBorder, borderWidth: 2 }]}>
                <TextInput placeholder='0' keyboardType='number-pad'
                  onFocus={customFocusOTPSix}
                  onBlur={customBlurOTPSix}
                  value={OTPSix}
                  onChangeText={(OTPSix) => {
                    setOTPSix(OTPSix)
                  }}
                  placeholderTextColor='#818D8E'
                  maxLength={1} style={[ Styles.OTPBox, Styles.fontBook14]} 
                  ref={pin6Ref} 
                  />
              </View>

            </View>

            {OTPError && 
              <Text style={[OTPError ? Styles.mb20: null, 
               Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>
                {OTPError}
              </Text>
            }

          {errorResponseText ? 
            <Text style={[errorResponseText ? Styles.mb20: null, Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>{errorResponseText}</Text>
            :
            null
          }

          </View>

          <View style={[Styles.flexRow, Styles.mt20, Styles.mb20]}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16]}>{Strings.ResendOTP}</Text>
            <Text style={[Styles.fontBlack16, Styles.fontBook16, {paddingLeft: 5}]}>01:25</Text>
          </View>

          {
            OTPOne && OTPTwo && OTPThree && OTPFour && OTPFive && OTPSix ?
            <TouchableOpacity onPress={() => confirmCode()} style={Styles.btnBlue}>
              <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.VerifyOTP}</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity disabled={true} style={[Styles.btnDisable, Styles.mt20]}>
              <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.VerifyOTP}</Text>
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
          <Text style={{fontFamily: 'GothamRounded-Book', fontWeight: '400', fontSize: 18, lineHeight: 25}}>{Strings.ForgetPasswordMsg}</Text>
        </View>
      </View>
      
    </SuccessfullyMsg>

    <LoadingOverlay visible={loading}/>
    </>
  );
}



export default UserOTP;
  