import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  PermissionsAndroid
  
} from 'react-native';
import Styles from '../../Styles/Styles';
import Images from '../../Constant/Images';
import Strings from '../../Constant/Strings';
import * as Animatable from 'react-native-animatable';
import AppBg from '../../Common/AppBg';
import Colors from '../../Theme/Colors';
import { Register, UserRegister } from '../../Api/Method';
import * as DocumentPicker from 'react-native-document-picker';
import SuccessfullyMsg from '../../Common/SuccessfullyMsg';
import Pdf from 'react-native-pdf';
import { BottomSheet } from 'react-native-btr';
import {launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions} from 'react-native-image-picker'
import RNFS from 'react-native-fs';
import LoadingOverlay from './LoadingOverlay';


const UserSignUp = ({ navigation }: { navigation: any }) => {

  const [showPassword, setShowPassword] = useState(false)
  const [ConfirmShowPassword, setConfirmShowPassword] = useState(false)
  const [check, setCheck] = useState(false)

  const [FirstNameFocusBorder, setFirstNameFocusBorder] = useState('#FFF')
  const [LastNameFocusBorder, setLastNameFocusBorder] = useState('#FFF')
  const [EmailFocusBorder, setEmailFocusBorder] = useState('#FFF')
  const [PasswordFocusBorder, setPasswordFocusBorder] = useState('#FFF')
  const [ConfirmPasswordFocusBorder, setConfirmPasswordFocusBorder] = useState('#FFF')

  const [FirstNameFocusIcon, setFirstNameFocusIcon] = useState(false)
  const [LastNameFocusIcon, setLastNameFocusIcon] = useState(false)
  const [EmailFocusIcon, setEmailFocusIcon] = useState(false)
  const [PasswordFocusIcon, setPasswordFocusIcon] = useState(false)
  const [ConfirmPasswordFocusIcon, setConfirmPasswordFocusIcon] = useState(false)


  const handleFirstNameFocusIcon = () => { setFirstNameFocusIcon(!FirstNameFocusIcon) }
  const handleLastNameFocusIcon = () => { setLastNameFocusIcon(!LastNameFocusIcon) }
  const handleEmailFocusIcon = () => { setEmailFocusIcon(!EmailFocusIcon) }
  const handlePasswordFocusIcon = () => { setPasswordFocusIcon(!PasswordFocusIcon) }
  const handleConfirmPasswordFocusIcon = () => { setConfirmPasswordFocusIcon(!ConfirmPasswordFocusIcon) }

  const customFocusEmail = () => { setEmailFocusBorder('#03849C') }
  const customFocusPassword = () => { setPasswordFocusBorder('#03849C') }
  const customFocusFirstName = () => { setFirstNameFocusBorder('#03849C') }
  const customFocusLastName = () => { setLastNameFocusBorder('#03849C') }
  const customFocusConfirmPassword = () => { setConfirmPasswordFocusBorder('#03849C') }

  const customBlurEmail = () => { setEmailFocusBorder('#FFF') }
  const customBlurPassword = () => { setPasswordFocusBorder('#FFF') }
  const customBlurFirstName = () => { setFirstNameFocusBorder('#FFF') }
  const customBlurLastName = () => { setLastNameFocusBorder('#FFF') }
  const customBlurConfirmPassword = () => { setConfirmPasswordFocusBorder('#FFF') }

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
  const [errorIDProof, setErrorIDProof] = useState('')
  const [IDProof, setIDProof] = useState<any>('')
  const [selectCamera, setSelectCamera] = useState<any>('')
  const [selectGallery, setSelectGallery] = useState<any>('')
  const [selectPdf, setSelectPdf] = useState<any>('')
  const [uploadName, setUploadName] = useState<any>('')
  const [visible, setVisible] = useState(false)
  const [Gender, setGender] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errorResponseText, setErrorResponseText] = useState('')

  const array: any[] | React.SetStateAction<any> = [];

  const GenderNavigation = () => {
    // setIDProof('')
    setSelectPdf('')
    setSelectCamera('')
    setSelectGallery('')
    IDProof == '' ? 
    setGender(true) : null
  };

  const PressVisiblePassword = () => {
    setShowPassword(!showPassword)
  }

  const PressConfirmVisiblePassword = () => {
    setConfirmShowPassword(!ConfirmShowPassword)
  }


  const optionCamera: CameraOptions = {
    mediaType: 'photo',
    quality: 0.5
  }

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    }
    launchCamera(optionCamera, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        console.log('source ===>', response);
        setSelectGallery(response?.assets[0]?.uri)
        setIDProof(response?.assets[0]?.uri)
        setUploadName(response?.assets[0]?.fileName)
      }
    });
    setGender(false);
  }


  

  const optionGallery: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.5
  }
  const openGallery = () => {
    setRefreshing(true);
    launchImageLibrary(optionGallery, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        console.log('response ===>', response);
        setSelectGallery(response?.assets[0]?.uri)
        setIDProof(response?.assets[0]?.uri)
        setUploadName(response?.assets[0]?.fileName)
      }
    })
    setGender(false);
  }

  const openDocumentDrive = async () => {
    setRefreshing(true);
    setGender(false);
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory'
      });

      console.log('response pdf ===>', response)
      setSelectPdf(response?.fileCopyUri)
      setIDProof(response?.fileCopyUri)
      setUploadName(response?.name)

    } catch (error) {
      console.log(error);
    }
  }
  

  const handleDeleteImage = () => {
    setIDProof('')
    setSelectPdf('')
    setSelectCamera('')
    setSelectGallery('')
  };

  const [IDProofProfile, setIDProofProfile] = useState<string | null>('')
  const [selectImgProfile, setSelectImgProfile] = useState<any>('')
  const [GenderProfile, setGenderProfile] = useState(false);
  const [selectGalleryProfile, setSelectGalleryProfile] = useState<string | null>(null)
  const [uploadNameProfile, setUploadNameProfile] = useState<string | null>(null)
  const [selectCameraProfile, setSelectCameraProfile] = useState<string | null>(null)
  
  const GenderNavigationProfile = () => {
    setIDProofProfile('')
    setSelectCameraProfile('')
    setSelectGalleryProfile('')
    setGenderProfile(true)
  };

  const optionsProfile: CameraOptions = {
    mediaType: 'photo',
    quality: 0.5
  }

  const openCameraProfile = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    }
    launchCamera(optionsProfile, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }  else {
        setSelectCameraProfile(response?.assets[0]?.uri)
        setIDProofProfile(response?.assets[0]?.fileName)
        setUploadNameProfile(response?.assets[0]?.fileName)
        setSelectImgProfile(response?.assets[0]?.uri)
      }
    });
    setGenderProfile(false);
  }

  const optionGalleryProfile: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.5
  }

  const openGalleryProfile = () => {
    launchImageLibrary(optionGalleryProfile, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }  else {
        setSelectGalleryProfile(response?.assets[0]?.uri)
        setIDProofProfile(response?.assets[0]?.fileName)
        setUploadNameProfile(response?.assets[0]?.fileName)
        setSelectImgProfile(response?.assets[0]?.uri)
      }
    })
    setGenderProfile(false);
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIDProof('')
      setSelectCamera('')
      setSelectGallery('')
    });
    return unsubscribe;
  }, [navigation])


  const checkBox = () => {
    setCheck(!check)
  }


  const isValidEmail = (email: string) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return emailRegex.test(email);
  };

  
  const UserSignUp = async () => {
    setErrorEmail('')
    setErrorPassword('')
    setErrorConfirmPassword('')
    let hasError = false;

    if(!isValidEmail(Email)){
      setErrorEmail('Email is not valid format')
      hasError = true
    } 
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
    
    const formData = new FormData();
    setLoading(true)

    if (IDProof !== null) {
      if (IDProof.endsWith('.jpg') || IDProof.endsWith('.jpeg') || IDProof.endsWith('.png')) {
        formData.append('id_proof', {
          uri: IDProof,
          type: 'image/jpeg',
          name: uploadName,
        });
      } else if (IDProof.endsWith('.pdf')) {
        formData.append('id_proof', {
          uri: IDProof,
          type: 'application/pdf',
          name: uploadName,
        });
      }
    } else {
      console.log('IDProof is null');
    }

    formData.append('fullname', FirstName)
    formData.append('fullname', LastName)
    formData.append('email', Email)
    formData.append('password', Password)
    formData.append('confirm_password', ConfirmPassword)
    formData.append('login_type', '0')
    formData.append('user_type', '0')
    formData.append('device_type','0')
    formData.append('device_token','0') 
    if (selectImgProfile !== null) {
      if (selectImgProfile.endsWith('.jpg') || selectImgProfile.endsWith('.jpeg') || selectImgProfile.endsWith('.png')) {
        formData.append('profile_photo', {
          uri: selectImgProfile,
          type: 'image/jpeg',
          name: uploadNameProfile,
        });
      } else if (selectImgProfile.endsWith('.pdf')) {
        formData.append('profile_photo', {
          uri: selectImgProfile,
          type: 'application/pdf',
          name: uploadNameProfile,
        });
      }
    } else {
      console.log('selectImgProfile is null');
    }
    

    try {     
      setLoading(true)
      const response = await UserRegister(formData)
      setLoading(false)
      setErrorResponseText(response?.data?.ResponseText)    
      console.log('formData ===>', JSON.stringify(formData));
      console.log('API response true =====>', JSON.stringify(response));
      if(response.status) {
        setVisible(true)
        setTimeout(() => {
          navigation.navigate('UserSignIn')
        }, 3000);
      }
      if (response.status === false && response.data && response.data.ResponseData && response.data.ResponseData.errors) {
        const validationErrors = response.data.ResponseData.errors;
        console.log('Validation Errors:', validationErrors);
        setErrorName(validationErrors[0]);
        setErrorEmail(validationErrors[1]);
        setErrorPassword(validationErrors[3]);
        setErrorConfirmPassword(validationErrors[4]);
      } else {
        setErrorName('');
        setErrorEmail('');
        setErrorPassword('');
        setErrorConfirmPassword('');
      } 
    } catch (error) {
      console.log('API response false =====>', error);     
    }

  }


  const closeModal = () => {
    setVisible(false)
    navigation.navigate('UserSignIn')
  }



  const handleFirstNameChange = (text: any) => {
    const formattedText = text.replace(/[^a-zA-Z!@#$%.\s]/g, '');
    setFirstName(formattedText);
  };

  const handleLastNameChange = (text: any) => {
    const formattedText = text.replace(/[^a-zA-Z!@#$%.\s]/g, '');
    setLastName(formattedText);
  };

  return (
    <>
      <AppBg />

      <ScrollView>

        <View style={Styles.marginHorizontal15}>

          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.mt48}>
            <Image source={Images.logo} style={Styles.loginBrand} />
          </Animatable.View>

          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.marginVertical20}>
            <Text style={[Styles.fontBlackMedium24, Styles.mb10, Styles.fontMedium24]}>{Strings.CreateAccount}</Text>
            <Text style={[Styles.fontBook14]}>{Strings.WelcomeDescription}</Text>
          </Animatable.View>

          <View style={[Styles.alignSelfCenter, Styles.mb20]}>   
              {selectGalleryProfile ? (
                  <View>
                    <Image source={{ uri: selectGalleryProfile }} style={[Styles.uploadDocShow, {width: 200, height: 180}]} />
                    <TouchableOpacity onPress={GenderNavigationProfile} style={{position: 'absolute', right: -20, bottom: -5}}>
                      <Image source={Images.ProfileEdit} style={Styles.uploadEdit}/>
                    </TouchableOpacity>
                  </View>
                ) : selectCameraProfile ? (
                  <View>
                    <Image source={{ uri: selectCameraProfile }} style={[Styles.uploadDocShow, {width: 200, height: 180}]} />
                    <TouchableOpacity onPress={GenderNavigationProfile} style={{position: 'absolute', right: -20, bottom: -5}}>
                      <Image source={Images.ProfileEdit} style={Styles.uploadEdit}/>
                    </TouchableOpacity>
                  </View>
                ) : (
                <TouchableOpacity style={[Styles.uploadDoc, {width: 200, height: 180}]}  onPress={GenderNavigationProfile}>
                  <Image source={Images.upload} style={Styles.docImg} />
                  <Text style={[Styles.fontBlack16, Styles.fontBook16, {textAlign: 'center', marginTop: 5}]}>{Strings.uploadTitle}</Text>
                  <Text style={[ Styles.fontBook14, {textAlign: 'center', marginTop: 5}]}>{Strings.sizeLimit}</Text>
                </TouchableOpacity>
              )
            }  
          </View>

          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.FirstName}</Text>
            <View style={[Styles.formControl, { borderColor: FirstNameFocusBorder, borderWidth: 2 }]}>
              {!FirstNameFocusIcon ? <Image source={Images.name_gray} style={Styles.authIconWidth} /> : <Image source={Images.name_black} style={Styles.authIconWidth} />}
              <TextInput placeholder='John'
                style={[ Styles.fontBook14, Styles.CustomWidth, Styles.pl10, Styles.textBlack]}
                onFocus={customFocusFirstName}
                onBlur={customBlurFirstName}
                onPressIn={handleFirstNameFocusIcon}
                placeholderTextColor='#818D8E'
                keyboardType='default'
                value={FirstName}
                onChangeText={handleFirstNameChange}
              />
            </View>            
          </View>
          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.LastName}</Text>
            <View style={[Styles.formControl, { borderColor: LastNameFocusBorder, borderWidth: 2 }]}>
              {!LastNameFocusIcon ? <Image source={Images.name_gray} style={Styles.authIconWidth} /> : <Image source={Images.name_black} style={Styles.authIconWidth} />}
              <TextInput placeholder='Smith'
                style={[ Styles.fontBook14, Styles.CustomWidth, Styles.pl10, Styles.textBlack]}
                onFocus={customFocusLastName}
                onBlur={customBlurLastName}
                onPressIn={handleLastNameFocusIcon}
                placeholderTextColor='#818D8E'
                keyboardType='default'
                value={LastName}
                onChangeText={handleLastNameChange}
              />
            </View>            
          </View>

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
                <Text style={[errorName ? Styles.mb20: null, 
                  Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>
                {errorEmail}
              </Text> : null
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
                  style={[Styles.CustomWidth, Styles.pl10, Styles.textBlack, Styles.fontBook14]}
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

            {errorPassword ?
                <Text style={[errorName ? Styles.mb20: null, 
                  Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>
                {errorPassword}
              </Text> : null
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
                  style={[Styles.CustomWidth, Styles.pl10, Styles.textBlack, Styles.fontBook14]}
                  onFocus={customFocusConfirmPassword}
                  onBlur={customBlurConfirmPassword}
                  onPressIn={handleConfirmPasswordFocusIcon}
                  placeholderTextColor='#818D8E'
                  secureTextEntry={!ConfirmShowPassword}
                  keyboardType='default'
                  value={ConfirmPassword}
                  onChangeText={text => setConfirmPassword(text)}
                />
              </View>

              <TouchableOpacity onPress={PressConfirmVisiblePassword}>
                {ConfirmShowPassword ?
                  <Image source={Images.eye_show} style={Styles.authIconWidth} />
                  :
                  <Image source={Images.eye_hide} style={Styles.authIconWidth} />
                }
              </TouchableOpacity>

            </View>
            {errorConfirmPassword ?
                <Text style={[errorName ? Styles.mb20: null, 
                  Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>
                {errorConfirmPassword}
              </Text> : null
            }

          </View>

          <View style={Styles.mb10}>

            <Text style={[Styles.fontBlack16, Styles.fontBook16]}>{Strings.UploadProof}</Text>
            {
              selectPdf ? (
                <>
                  <Pdf
                    trustAllCerts={false}
                    source={{ uri: selectPdf, cache: true }}
                    onLoadComplete={(numberOfPages, filePath) => {
                      console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                      console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                      console.log(error);
                    }}
                    onPressLink={(uri) => {
                      console.log(`Link pressed: ${uri}`);
                    }}
                    style={Styles.UserViewDocument}
                  />
                  <View style={[Styles.flexBetween, Styles.formControl, Styles.pt10, Styles.pb10]}>
                    <Text style={[Styles.fontBlack16, Styles.fontBook16, {width: '85%'}]}>{uploadName}</Text>
                    <View style={Styles.flexBetween}>

                      {/* <TouchableOpacity onPress={GenderNavigation}>
                        <Image source={Images.ProfileEdit} style={Styles.uploadEdit} />
                      </TouchableOpacity> */}

                      <TouchableOpacity onPress={handleDeleteImage}>
                        <Image source={Images.delete} style={Styles.uploadDelete} />
                      </TouchableOpacity>

                    </View>
                  </View>
                </>
              ) : selectGallery ? (
                <>
                  <Image source={{ uri: selectGallery }} style={Styles.UserViewDocument} />
                  <View style={[Styles.flexBetween, Styles.formControl, Styles.pt10, Styles.pb10]}>
                    <Text style={[Styles.fontBlack16, Styles.fontBook16, {width: '85%'}]}>{uploadName}</Text>
                    <View style={Styles.flexBetween}>

                      {/* <TouchableOpacity onPress={GenderNavigation}>
                        <Image source={Images.ProfileEdit} style={Styles.uploadEdit} />
                      </TouchableOpacity> */}

                      <TouchableOpacity onPress={handleDeleteImage}>
                        <Image source={Images.delete} style={Styles.uploadDelete} />
                      </TouchableOpacity>

                    </View>
                  </View>
                </>
              ) : selectCamera ? (
                <>
                    <Image source={{ uri: selectCamera }} style={Styles.UserViewDocument} />
                    <View style={[Styles.flexBetween, Styles.formControl, Styles.pt10, Styles.pb10]}>
                      <Text style={[Styles.fontBlack16, Styles.fontBook16, {width: '85%'}]}>{uploadName}</Text>
                      <View style={Styles.flexBetween}>

                        {/* <TouchableOpacity onPress={GenderNavigation}>
                          <Image source={Images.ProfileEdit} style={Styles.uploadEdit} />
                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={handleDeleteImage}>
                          <Image source={Images.delete} style={Styles.uploadDelete} />
                        </TouchableOpacity>

                      </View>
                    </View>
                  </>
              ) : (
                <TouchableOpacity style={Styles.UserDocWidth} onPress={GenderNavigation}>
                  <Image source={Images.upload} style={Styles.docImg} />
                  <Text style={[Styles.fontBlack16, Styles.fontBook16]}>{Strings.uploadTitle}</Text>
                  <Text style={[Styles.fontBook14]}>{Strings.sizeLimit}</Text>
                </TouchableOpacity>
              )
            }
              <Text style={[errorIDProof ? Styles.mb20: null, 
                Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>
              {errorIDProof}
            </Text>

          </View>

          <View style={Styles.flexStart}>
            {
              check ?
                <TouchableOpacity onPress={checkBox}>
                  <Image source={Images.checked} style={[Styles.docImg, Styles.mr10]}/> 
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={checkBox}>
                  <Image source={Images.unchecked} style={[Styles.docImg, Styles.mr10]}/> 
                </TouchableOpacity>

            }
            <Text style={[Styles.mr15, Styles.fontBook14]}>{Strings.CheckmarkDescription}</Text>
          </View>

          {
            FirstName && LastName && Email && Password && ConfirmPassword && IDProof && check ?
              <TouchableOpacity onPress={UserSignUp} style={[Styles.btnBlue, Styles.mt20]}>
                  <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.SignUp}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity disabled={true} style={[Styles.btnDisable, Styles.mt20]}>
                <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.SignUp}</Text>
              </TouchableOpacity>
          } 
          

          <View style={[Styles.flexRow, Styles.mb20]}>
            <Text style={[Styles.fontBook14]}>{Strings.HaveAccount}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('UserSignIn')}>
              <Text style={[Styles.fontBlue14, Styles.pl10]}>{Strings.SignIn}</Text>
            </TouchableOpacity>

          </View>

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
            <Text style={{fontFamily: 'GothamRounded-Book', fontWeight: '400', fontSize: 18, lineHeight: 25}}>{Strings.RegisterMsg}</Text>
          </View>

        </View>

      </SuccessfullyMsg>

      <BottomSheet visible={GenderProfile}>

        <View style={Styles.uploadDocumentView}>
          <Text style={Styles.uploadDocTitle}>Upload document</Text>
          <TouchableOpacity style={Styles.uploadDocBtn} onPress={openCameraProfile}>
            <Image source={Images.Camera} style={Styles.uploadDocImg} />
            <Text style={Styles.docTitle}>{Strings.TakePhoto}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.uploadDocBtn} onPress={openGalleryProfile}>
            <Image source={Images.Gallery} style={Styles.uploadDocImg} />
            <Text style={Styles.docTitle}>{Strings.ChooseGallery}</Text>
          </TouchableOpacity>
        </View>

      </BottomSheet>

      <LoadingOverlay visible={loading}/>


      <BottomSheet visible={Gender}>

        <View style={Styles.uploadDocumentView}>
          <Text style={Styles.uploadDocTitle}>Upload document</Text>
          <TouchableOpacity style={Styles.uploadDocBtn} onPress={openCamera}>
            <Image source={Images.Camera} style={Styles.uploadDocImg} />
            <Text style={Styles.docTitle}>{Strings.TakePhoto}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.uploadDocBtn} onPress={openGallery}>
            <Image source={Images.Gallery} style={Styles.uploadDocImg} />
            <Text style={Styles.docTitle}>{Strings.ChooseGallery}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.uploadDocBtn} onPress={openDocumentDrive}>
            <Image source={Images.Document} style={Styles.uploadDocImg} />
            <Text style={Styles.docTitle}>{Strings.ChooseDocument}</Text>
          </TouchableOpacity>
        </View>

      </BottomSheet>

      <LoadingOverlay visible={loading}/>
    </>
  );
}




export default UserSignUp;
