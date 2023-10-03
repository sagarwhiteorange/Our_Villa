import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, PermissionsAndroid} from 'react-native';
import Styles from '../../Styles/Styles';
import Images from '../../Constant/Images';
import Strings from '../../Constant/Strings';
import { Path, Svg } from 'react-native-svg';
import AppBg from '../../Common/AppBg';
import Colors from '../../Theme/Colors';
import { CityList, CountryList, StateList, UserRegister } from '../../Api/Method';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dropdown } from 'react-native-element-dropdown';
import LoadingOverlay from '../User/LoadingOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera,CameraOptions,  launchImageLibrary, ImageLibraryOptions} from 'react-native-image-picker'
import { BottomSheet } from 'react-native-btr';


enum Url {
  ProfilePhoto = 'ProfilePhoto',
  HomeCareSignIn = 'HomeCareSignIn',
}

interface RouteParams {
  HomeCareAddress?: string;
  City?: string;
  State?: string;
  Country?: string;
}



const HomeCareSignUp = () => {

  const route = useRoute();
  

  const Experience = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' }
  ]

  const Skills = [
    { label: 'Dance', value: '0' },
    { label: 'Music', value: '1' },
    { label: 'Drawing', value: '2' },
    { label: 'Games', value: '3' },
    { label: 'Cooking', value: '4' },
    { label: 'Crafting', value: '5' }
  ]


  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()

  const { HomeCareAddress }: RouteParams = route.params || {};
  const { City }: RouteParams = route.params || {};
  const { State }: RouteParams = route.params || {};
  const { Country }: RouteParams = route.params || {};

   

  const [selectUser, setSelectUser] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [FirstNameFocusBorder, setFirstNameFocusBorder] = useState('#FFF')
  const [LastNameFocusBorder, setLastNameFocusBorder] = useState('#FFF')
  const [EmailFocusBorder, setEmailFocusBorder] = useState('#FFF')
  const [PasswordFocusBorder, setPasswordFocusBorder] = useState('#FFF')
  const [ConfirmPasswordFocusBorder, setConfirmPasswordFocusBorder] = useState('#FFF')
  const [DOBFocusBorder, setDOBFocusBorder] = useState('#FFF')
  const [AddressFocusBorder, setAddressFocusBorder] = useState('#FFF')
  const [PhoneNumberBorder, setPhoneNumberFocusBorder] = useState('#FFF')

  const [FirstNameFocusIcon, setFirstNameFocusIcon] = useState(false)
  const [LastNameFocusIcon, setLastNameFocusIcon] = useState(false)
  const [EmailFocusIcon, setEmailFocusIcon] = useState(false)
  const [PasswordFocusIcon, setPasswordFocusIcon] = useState(false)
  const [ConfirmPasswordFocusIcon, setConfirmPasswordFocusIcon] = useState(false)
  const [DOBFocusIcon, setDOBFocusIcon] = useState(false)
  const [AddressFocusIcon, setAddressFocusIcon] = useState(false)
  const [PhoneNumberIcon, setPhoneNumberIcon] = useState(false)


  const handleFirstNameFocusIcon = () => { setFirstNameFocusIcon(!FirstNameFocusIcon) }
  const handleLastNameFocusIcon = () => { setLastNameFocusIcon(!LastNameFocusIcon) }
  const handleEmailFocusIcon = () => { setEmailFocusIcon(!EmailFocusIcon) }
  const handlePasswordFocusIcon = () => { setPasswordFocusIcon(!PasswordFocusIcon) }
  const handleConfirmPasswordFocusIcon = () => { setConfirmPasswordFocusIcon(!ConfirmPasswordFocusIcon) }
  const handleDOBFocusIcon = () => { setDOBFocusIcon(!DOBFocusIcon) }
  const handleAddressFocusIcon = () => { setAddressFocusIcon(!AddressFocusIcon) }

  const customFocusEmail = () => { setEmailFocusBorder('#03849C') }
  const customFocusPassword = () => { setPasswordFocusBorder('#03849C') }
  const customFocusFirstName = () => { setFirstNameFocusBorder('#03849C') }
  const customFocusLastName = () => { setLastNameFocusBorder('#03849C') }
  const customFocusConfirmPassword = () => { setConfirmPasswordFocusBorder('#03849C') }
  const customFocusDOB = () => { setDOBFocusBorder('#03849C') }
  const customFocusAddress = () => { setAddressFocusBorder('#03849C') }
  const customFocusPhoneNumber = () => { setPhoneNumberFocusBorder('#03849C') }

  const customBlurEmail = () => { setEmailFocusBorder('#FFF') }
  const customBlurPassword = () => { setPasswordFocusBorder('#FFF') }
  const customBlurFirstName = () => { setFirstNameFocusBorder('#FFF') }
  const customBlurLastName = () => { setLastNameFocusBorder('#FFF') }
  const customBlurConfirmPassword = () => { setConfirmPasswordFocusBorder('#FFF') }
  const customBlurDOB = () => { setDOBFocusBorder('#FFF') }
  const customBlurAddress = () => { setAddressFocusBorder('#FFF') }
  const customBlurPhoneNumber = () => { setPhoneNumberFocusBorder('#FFF') }

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [DOB, setDOB] = useState('');
  const [NewDate, setNewDate] = useState('')
  
  
  const [countryList, setCountryList] = useState<any>([]);
  const [stateList, setStateList] = useState<any>([]);
  const [cityList, setCityList] = useState<any>([]);
  
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [SelectGender, setSelectGender] = useState('M')
  const [Address, setAddress] = useState<any>('');
  const [check, setCheck] = useState(false) 
  const [Current, setCurrent] = useState('1')
  const [About, setAbout] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [ExperienceValue, setExperienceValue] = useState('');
  const [Price, setPrice] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<any>([]);
  const [SkillsValue, setSkillsValue] = useState<string[]>([]);
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
  const [DateShow, setDateShow] = useState(false)
  const [errorResponseText, setErrorResponseText] = useState('')
  const [errorResponseBirth, setErrorResponseBirth] = useState('')
  const [CountryID, setCountryID] = useState('') 
  const [StateId, setStateId] = useState('') 
  const [StateCode, setStateCode] = useState('')
  const [FullName, setFullName] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [Certn, setCertn] = useState('')
  const [city, setCity] = useState<any>('');
  const [state, setState] = useState<any>('');
  const [country, setCountry] = useState<any>('');
  const [IDProof, setIDProof] = useState<string | null>('')
  const [selectImg, setSelectImg] = useState<any>('')
  const [Gender, setGender] = useState(false);
  const [selectGallery, setSelectGallery] = useState<string | null>(null)
  const [uploadName, setUploadName] = useState<string | null>(null)
  const [selectCamera, setSelectCamera] = useState<string | null>(null)
  
  const GenderNavigation = () => {
    setIDProof('')
    setSelectCamera('')
    setSelectGallery('')
    setGender(true)
  };

  const options: CameraOptions = {
    mediaType: 'photo',
    quality: 0.5
  }

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    }
    launchCamera(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }  else {
        setSelectCamera(response?.assets[0]?.uri)
        setIDProof(response?.assets[0]?.fileName)
        setUploadName(response?.assets[0]?.fileName)
        setSelectImg(response?.assets[0]?.uri)
      }
    });
    setGender(false);
  }

  const optionGallery: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 0.5
  }

  const openGallery = () => {
    launchImageLibrary(optionGallery, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }  else {
        setSelectGallery(response?.assets[0]?.uri)
        setIDProof(response?.assets[0]?.fileName)
        setUploadName(response?.assets[0]?.fileName)
        setSelectImg(response?.assets[0]?.uri)
      }
    })
    setGender(false);
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIDProof('')
      setSelectCamera('')
      setSelectGallery('')
    });
    return unsubscribe;
  }, [navigation])

  

  const PressVisiblePassword = () => {
    setShowPassword(!showPassword)
  }

  const PressVisibleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleDateChange = (event: any, date: any) => {
    if (date) {
      setSelectedDate(date)
      const formattedDate = formatDate(date);
      setNewDate(formattedDate);
      setDateShow(false); 
    }
  };
  
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  

  const handleFirstNameChange = (text: any) => {
    const formattedText = text.replace(/[^a-zA-Z!@#$%.\s]/g, '');
    setFirstName(formattedText);
  };

  const handleLastNameChange = (text: any) => {
    const formattedText = text.replace(/[^a-zA-Z!@#$%.\s]/g, '');
    setLastName(formattedText);
  };


  const isValidEmail = (email: string) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return emailRegex.test(email);
  };

  
  const handleSelect = (selectedItem: any) => {
    if (selectedSkills.includes(selectedItem.label)) {
      setSelectedSkills(selectedSkills.filter((skill: any) => skill !== selectedItem.label)); 
      setSkillsValue((prevSkillsValue: string[]) => prevSkillsValue.filter((value: string) => value !== selectedItem.value));     
    } else {
      setSelectedSkills([...selectedSkills, selectedItem.label]);
      setSkillsValue([...SkillsValue, selectedItem.value]);
    }
  };


  const handleRemoveSkill = (indexToRemove: any) => {
    setSelectedSkills((prevSkills: any[]) => prevSkills.filter((_, index) => index !== indexToRemove));
  };

  const StoreValue = () => {
    const CityStore = City
    setCity(CityStore)
    
    const StateStore = State
    setState(StateStore)

    const CountryStore = Country
    setCountry(CountryStore)

    const FullAddress = HomeCareAddress
    setAddress(FullAddress)
  }

  useEffect(() => {
    StoreValue()
  }, [City, State, Country])


  useEffect(() => {
    setCity(City);
    setState(State);
    setCountry(Country);
  }, [City, State, Country]);

  const checkBox = () => {
    setCheck(!check);
    setCurrent(check ? '0' : '1')

    if (check) {
      setCity(City);
      setState(State);
      setCountry(Country);
    } else {
      setCity('');
      setState('');
      setCountry('');
    }
  };

  const handleCountryList = async () => {
    try {
      const response = await CountryList();
      const countries = response?.data?.ResponseData || [];
      if (Array.isArray(countries)) {
        setCountryList(countries);
      } else {
        console.log('Country list error:', countries);
      }
    } catch (error) {
      console.error('Error fetching country list:', error);
    }
  }

  const handleStateList = async () => {
    const params = {
      "country_id": CountryID
    };
    
    try {
      const response = await StateList(params);
      const states = response?.data?.ResponseData || [];
      if (Array.isArray(states)) {
        setStateList(states);
      } else {
        console.log('State list error:', states);
      }
    } catch (error) {
      console.error('Error fetching state list:', error);
    }
  }

  const handleCityList = async () => {
    const params = {
      "state_id": StateId
    };
    try {
      const response = await CityList(params);
      const cities = response?.data?.ResponseData || [];
      if (Array.isArray(cities)) {
        setCityList(cities);
      } else {
        console.log('City list error:', cities);
      }
    } catch (error) {
      console.error('Error fetching city list:', error);
    }
  }

  useEffect(() => {
    handleCountryList();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      handleStateList(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      handleCityList(selectedState);
    }
  }, [selectedState]);


  const HandleFullname = () => {
    const GetFullName = `${FirstName} ${LastName}`
    setFullName(GetFullName)
  }

  useEffect(() => {
    HandleFullname();
  }, [FirstName, LastName])



  const HomeCareSignUpAPI = async() => {
    
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
    formData.append('first_name', FirstName)
    formData.append('last_name', LastName)
    formData.append('fullname', FullName)
    formData.append('email', Email)
    formData.append('dob', NewDate)
    formData.append('address', Address) 
    formData.append('about', About)
    formData.append('password', Password)
    formData.append('confirm_password', ConfirmPassword)
    formData.append('login_type', '0')
    formData.append('user_type', '1')
    formData.append('device_token', '0')
    formData.append('device_type', '0')
    formData.append('profile_photo', selectImg)
    formData.append('experience', ExperienceValue)
    formData.append('price', Price)
    for (let i = 0; i < SkillsValue.length; i++) {
      formData.append(`skills[${i}]`, SkillsValue[i])
    }    
    formData.append('birth_city', selectedCity)
    formData.append('birth_province_state', StateCode)
    formData.append('birth_country', selectedCountry)
    formData.append('gender', SelectGender)
    formData.append('phone_number', PhoneNumber) 
    formData.append('city', City)
    formData.append('province_state', State)
    formData.append('country', Country)      
    formData.append('current', Current)
    
    console.log('formData ============================>', formData);

    try {
      setLoading(true);
      const response = await UserRegister(formData);
      setLoading(false);
      if (response && response.ResponseData) {
        const certnUrl = response.ResponseData.Homecareuser?.certn_url;
        if (certnUrl) {
          await AsyncStorage.setItem('Certn', certnUrl);
          console.log('certn_url', certnUrl);
          navigation.navigate('HomeCateCertn', { Certn: certnUrl });
        }
        setErrorResponseBirth(response?.ResponseData?.date_of_birth[0]);
        setErrorResponseText(response?.ResponseData?.errors[0])        
      } else if (response && response.status === false && response.data && response.data.ResponseData.errors) {
        const validationErrors = response.data.ResponseData.errors;
        console.log('validationErrors ==========================>', validationErrors);
      } else {
        setErrorEmail('');
      }
    } catch (error) {
      console.log('API response false =====>', error);
    }
  }







  return (
    <>
    <AppBg />
    <ScrollView>
        <View style={Styles.marginHorizontal15}>
          <View style={Styles.mt48}>
            <Image source={Images.logo} style={Styles.loginBrand} />
          </View>
          <View style={Styles.marginVertical20}>
            <Text style={[Styles.fontBlackMedium24, Styles.mb10, Styles.fontMedium24]}>{Strings.CreateAccount}</Text>
            <Text style={[ Styles.fontBook14]}>{Strings.WelcomeDescription}</Text>
          </View>
          <View style={[Styles.alignSelfCenter, Styles.mb20]}>   
              {selectGallery ? (
                  <View>
                    <Image source={{ uri: selectGallery }} style={[Styles.uploadDocShow, {width: 200, height: 180}]} />
                    <TouchableOpacity onPress={GenderNavigation} style={{position: 'absolute', right: -20, bottom: -5}}>
                      <Image source={Images.ProfileEdit} style={Styles.uploadEdit}/>
                    </TouchableOpacity>
                  </View>
                ) : selectCamera ? (
                  <View>
                    <Image source={{ uri: selectCamera }} style={[Styles.uploadDocShow, {width: 200, height: 180}]} />
                    <TouchableOpacity onPress={GenderNavigation} style={{position: 'absolute', right: -20, bottom: -5}}>
                      <Image source={Images.ProfileEdit} style={Styles.uploadEdit}/>
                    </TouchableOpacity>
                  </View>
                ) : (
                <TouchableOpacity style={[Styles.uploadDoc, {width: 200, height: 180}]}  onPress={GenderNavigation}>
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
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.Email}</Text>
            <View style={[Styles.formControl, { borderColor: EmailFocusBorder, borderWidth: 2 }]}>
              {!EmailFocusIcon ? <Image source={Images.email_gray} style={Styles.authIconWidth} /> : <Image source={Images.email_black} style={Styles.authIconWidth} />}
              <TextInput placeholder='johnsmith@gmail.com'
                style={[ Styles.CustomWidth, Styles.pl10, Styles.textBlack, Styles.fontBook14]}
                onFocus={customFocusEmail}
                onBlur={customBlurEmail}
                onPressIn={handleEmailFocusIcon}
                placeholderTextColor='#818D8E'
                keyboardType='email-address'
                value={Email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            {errorEmail && <Text style={[errorEmail ? Styles.mb20: null, Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>{errorEmail}</Text>}
            
            
          </View>

          <View style={Styles.mt10}>
              <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.PhoneNumber}</Text>
              <View style={Styles.formControl}>
                {!PhoneNumberIcon ? <Image source={Images.phone_gray} style={Styles.authIconWidth} /> : <Image source={Images.phone_black} style={Styles.authIconWidth} />}
                <TextInput placeholder='Type here...' keyboardType='number-pad'
                  style={[ Styles.CustomWidth,Styles.fontBook14, Styles.pl10, Styles.textBlack, { textAlignVertical: 'center' }]} 
                  value={PhoneNumber}
                  placeholderTextColor='#818D8E'
                  onChangeText={text => setPhoneNumber(text)}
                />
              </View>
            </View>

          <View style={Styles.mt20}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.Password}</Text>
            <View style={[Styles.formControl, { borderColor: PasswordFocusBorder, borderWidth: 2 }]}>
              <View style={Styles.alignCenter}>
                {!PasswordFocusIcon ? <Image source={Images.password_gray} style={Styles.authIconWidth} /> : <Image source={Images.password_black} style={Styles.authIconWidth} />}
                <TextInput placeholder='Enter password'
                  style={[ Styles.CustomWidth, Styles.pl10, Styles.textBlack, Styles.fontBook14]}
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
                  <Image source={Images.eye_show} style={Styles.authIconWidth} /> : <Image source={Images.eye_hide} style={Styles.authIconWidth} />
                }
              </TouchableOpacity>
            </View>
            {errorPassword && <Text style={[errorPassword ? Styles.mb20: null, Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>{errorPassword}</Text>}
            
          </View>

          <View style={Styles.mt20}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.ConfirmPassword}</Text>
            <View style={[Styles.formControl, { borderColor: ConfirmPasswordFocusBorder, borderWidth: 2 }]}>
              <View style={Styles.alignCenter}>
                {!ConfirmPasswordFocusIcon ? <Image source={Images.password_gray} style={Styles.authIconWidth} /> : <Image source={Images.password_black} style={Styles.authIconWidth} />}
                <TextInput placeholder='Enter password'
                  style={[ Styles.CustomWidth, Styles.pl10, Styles.textBlack, Styles.fontBook14]}
                  onFocus={customFocusConfirmPassword}
                  onBlur={customBlurConfirmPassword}
                  onPressIn={handleConfirmPasswordFocusIcon}
                  placeholderTextColor='#818D8E'
                  secureTextEntry={!showConfirmPassword}
                  keyboardType='default'
                  value={ConfirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                />
              </View>
              <TouchableOpacity onPress={PressVisibleConfirmPassword}>
                {showConfirmPassword ?
                  <Image source={Images.eye_show} style={Styles.authIconWidth} /> : <Image source={Images.eye_hide} style={Styles.authIconWidth} />
                }
              </TouchableOpacity>
            </View>
            {errorConfirmPassword && <Text style={[errorConfirmPassword ? Styles.mb20: null, Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>{errorConfirmPassword}</Text>}
            
          </View>

          <View style={Styles.mt20}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.DateBirth}</Text>
            <View style={[Styles.flexRow, Styles.formControl, Styles.paddingVertical15]}>
              <TouchableOpacity style={[Styles.flexRow]}>
                {!DOBFocusIcon ? <Image source={Images.dob_gray} style={Styles.authIconWidth} /> : <Image source={Images.dob_black} style={Styles.authIconWidth} />}
                {NewDate ? 
                  <Text  style={[ Styles.CustomWidth, Styles.pl10, Styles.textBlack]}>{NewDate}</Text> 
                  : 
                  <Text  style={[ Styles.CustomWidth, Styles.pl10, Styles.textBlack]}>Select Date</Text>
                }
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDateShow(true)}><Image source={Images.calendar_blue} style={Styles.authIconWidth}/></TouchableOpacity>
              {DateShow && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>            
          </View>

          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.marginVertical10, Styles.fontBook16]}>Birth Country</Text>
            <Dropdown
              style={[Styles.boxShadow, Styles.height55, Styles.mt10]}
              data={countryList}
              search
              labelField="name"
              valueField="sortname2"
              placeholder={selectedCountry ? selectedCountry : 'Select country'}
              value={selectedCountry}
              onChange={(selected) =>  {
                const selectedName = selected?.sortname2
                setSelectedCountry(selectedName)
                const selectedId = selected?.id
                setCountryID(selectedId)
              }}
              renderItem={(item) => {
                return (
                  <View style={[Styles.flexRow, Styles.pb10, Styles.pt10, Styles.justifyStart, Styles.pl20]}>
                    <Text style={[Styles.fontGray16, Styles.fontBook16]}>{item.name}</Text>
                  </View>
                );
              }}
            />

        
          </View>

          <View style={[Styles.mb10]}>
            <Text style={[Styles.fontBlack16, Styles.marginVertical10, Styles.fontBook16]}>Birth State</Text>
            <Dropdown
              style={[Styles.boxShadow, Styles.height55, Styles.mt10]}
              data={stateList}
              search
              labelField="name"
              valueField="id"
              placeholder={selectedState ? selectedState : 'Select State'}
              value={selectedState}
              onChange={(selected) => {
                const selectedName = selected?.name
                setSelectedState(selectedName)
                const selectedId = selected?.id
                setStateId(selectedId)
                const selectedStateCode = selected?.state_code
                setStateCode(selectedStateCode)
              }}
              renderItem={(item) => {
                return (
                  <View style={[Styles.flexRow, Styles.pb10, Styles.pt10, Styles.justifyStart, Styles.pl20]}>
                    <Text style={[Styles.fontGray16, Styles.fontBook16]}>{item.name}</Text>
                  </View>
                );
              }}
            />            
          </View>

          <View style={Styles.mb20}>
            <Text style={[Styles.fontBlack16, Styles.marginVertical10, Styles.fontBook16]}>Birth City</Text>
            <Dropdown
              style={[Styles.boxShadow, Styles.height55, Styles.mt10]}
              data={cityList}
              search
              labelField="name"
              valueField="id"
              placeholder={selectedCity ? selectedCity : 'Select city'}
              value={selectedCity}
              onChange={(selected) => {
                const selectedName = selected?.name
                setSelectedCity(selectedName)
              }}
              renderItem={(item) => {
                return (
                  <View style={[Styles.flexRow, Styles.pb10, Styles.pt10, Styles.justifyStart, Styles.pl20]}>
                    <Text style={[Styles.fontGray16, Styles.fontBook16]}>{item.name}</Text>
                  </View>
                );
              }}
            />            
          </View>


          <View style={Styles.mb20}>
              <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.SelectGender}</Text>
              <View style={[Styles.flexRow, Styles.mt15, Styles.justifyStart]}>

                <TouchableOpacity style={Styles.flexRow} onPress={() => setSelectGender('M')}>
                  <Text style={{ position: 'relative' }}>
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                    </Svg>
                  </Text>

                  {SelectGender === 'M' ? <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                    </Svg>
                  </Text> : null}
                  <Text style={SelectGender === 'M' ? [[Styles.fontBlack14, Styles.fontBook14, { marginLeft: 5 }]] : [[ Styles.fontBook14, { marginLeft: 5 }]]}>Male</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[Styles.flexRow, { marginLeft: 10 }]} onPress={() => setSelectGender('F')}>
                  <Text style={{ position: 'relative' }}>
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                    </Svg>
                  </Text>

                  {SelectGender === 'F' ? <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                    </Svg>
                  </Text> : null}
                  <Text style={SelectGender === 'F' ? [[Styles.fontBlack14, Styles.fontBook14, Styles.ml10]] : [[ Styles.fontBook14, Styles.ml10]]}>Female</Text>
                </TouchableOpacity>
              </View>
          </View>

          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.Address}</Text>
            <TouchableOpacity style={[Styles.formControl, { borderColor: AddressFocusBorder, borderWidth: 2, paddingVertical: 15 }]} onPress={() => navigation.navigate('HomeCareSetLocation')}>
              {!AddressFocusIcon ? <Image source={Images.location_gray} style={Styles.authIconWidth} /> : <Image source={Images.location_black} style={Styles.authIconWidth} />}
              {HomeCareAddress ? 
                <Text style={[Styles.pl10, Styles.textBlack, Styles.fontBook14, Styles.fontBook14]}>{HomeCareAddress}</Text> 
                : 
                <Text style={[Styles.pl10, Styles.textBlack, Styles.fontBook14, Styles.fontBook14]}>Enter your address</Text>
              }
            </TouchableOpacity>            
          </View>
          <View style={Styles.flexStart}>

            <TouchableOpacity onPress={checkBox}>
            {
              !check ? (
              <Image source={Images.checked} style={[Styles.docImg, Styles.mr10]}/> 
              ) : (
                <Image source={Images.unchecked} style={[Styles.docImg, Styles.mr10]}/> 
              )
            }
            </TouchableOpacity>
            
            <Text style={[Styles.mr15, Styles.fontBook14]}>Current Address</Text>
          </View>

          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.marginVertical10,Styles.fontBook16,]}>City</Text>
            <View style={[Styles.formControl, {paddingVertical: 15}]}>
              <Image source={Images.city} style={Styles.authIconWidth}/>
              {
                !city ? (
                  <Text style={[Styles.fontBook16, Styles.pl10]}>City</Text>                
                ) : (
                  <Text style={[Styles.fontBook16, Styles.pl10]}>{city}</Text>
                ) 
              }             
            </View>
          </View>

          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.marginVertical10,Styles.fontBook16,]}>Province State</Text>
            <View style={[Styles.formControl, {paddingVertical: 15}]}>
              <Image source={Images.state} style={Styles.authIconWidth}/>
              {
                !state ? (
                  <Text style={[Styles.fontBook16, Styles.pl10]}>State</Text>                
                ) : (
                  <Text style={[Styles.fontBook16, Styles.pl10]}>{state}</Text>
                ) 
              } 
              <Text style={[Styles.fontBook16, Styles.pl10]}>{state}</Text>
            </View>
          </View>

          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.marginVertical10,Styles.fontBook16,]}>Country</Text>
            <View style={[Styles.formControl, {paddingVertical: 15}]}>
              <Image source={Images.country} style={Styles.authIconWidth}/>
              {
                !country ? (
                  <Text style={[Styles.fontBook16, Styles.pl10]}>Country</Text>                
                ) : (
                  <Text style={[Styles.fontBook16, Styles.pl10]}>{country}</Text>
                ) 
              } 
            </View>
          </View>
          
          <View style={Styles.mb10}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.SelectLocation}</Text>
            <View style={[Styles.flexRow, Styles.mt15, Styles.justifyStart]}>

              <TouchableOpacity style={Styles.flexRow} onPress={() => setSelectUser(1)}>
                <Text style={{ position: 'relative' }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                  </Svg>
                </Text>

                {selectUser === 1 ? <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                  </Svg>
                </Text> : null}
                <Text style={selectUser === 1 ? [[Styles.fontBlack14, Styles.fontBook14, { marginLeft: 5 }]] : [[ Styles.fontBook14, { marginLeft: 5 }]]}>At home</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[Styles.flexRow, { marginLeft: 10 }]} onPress={() => setSelectUser(2)}>
                <Text style={{ position: 'relative' }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                  </Svg>
                </Text>

                {selectUser === 2 ? <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                  </Svg>
                </Text> : null}
                <Text style={selectUser === 2 ? [[Styles.fontBlack14, Styles.fontBook14, Styles.ml10]] : [[ Styles.fontBook14, Styles.ml10]]}>At babysitter’s</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={Styles.mt10}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.About}</Text>
            <View style={Styles.formControl}>
              <TextInput placeholder='Type here...' keyboardType='default' numberOfLines={4} multiline={true} 
                style={[ Styles.CustomWidth,Styles.fontBook14, Styles.pl10, Styles.textBlack, { textAlignVertical: 'top' }]} 
                value={About}
                placeholderTextColor='#818D8E'
                onChangeText={text => setAbout(text)}
              />
            </View>            
          </View>

          <View style={Styles.flexBetween}>
            <View style={{ width: '47%' }}>
              <Text style={[Styles.fontBlack16, Styles.marginVertical10,Styles.fontBook16,]}>Experience</Text>
              <Dropdown
                style={[Styles.boxShadow, Styles.height55, Styles.mt10]}
                data={Experience}
                labelField="label"
                valueField="value"
                placeholder="1"
                value={ExperienceValue}
                onChange={text => setExperienceValue(text.value)}
                renderItem={(item) => {
                  return (
                    <View style={[Styles.flexRow, Styles.pb10, Styles.pt10, Styles.justifyStart, Styles.pl20]}>
                      <Text style={[Styles.fontGray16, Styles.fontBook16]}>{item.label}</Text>
                    </View>
                  );
                }}
              />
            </View>
            <View style={{ width: '47%' }}>
              <Text style={[Styles.fontBlack16, Styles.marginVertical10, Styles.fontBook16,]}>Price/hour</Text>
              <View style={[Styles.formControl, { borderColor: ConfirmPasswordFocusBorder, borderWidth: 2 }]}>
                <View style={Styles.alignCenter}>
                  <TextInput placeholder='Ex. $20'
                    style={[ Styles.CustomWidth, Styles.pl10, Styles.textBlack, Styles.fontBook14]}
                    placeholderTextColor='#818D8E'
                    keyboardType='number-pad'
                    value={Price}
                    onChangeText={text => setPrice(text)}
                  />
                </View>
              </View>

            </View>
          </View>

          <View style={Styles.mt10}>
            <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.Skills}</Text>
            <Dropdown
              style={[Styles.boxShadow, Styles.height55, Styles.mt10]}
              data={Skills}
              labelField="label"
              valueField="value"
              placeholder="Select your skills"
              value={selectedSkills.map((skill: any) => skill).join(',')}
              onChange={handleSelect}
            />
            <View style={[Styles.alignCenter, Styles.mt20, {flexWrap: 'wrap'}]}>
              {selectedSkills.map((skill: any, index: any) => (
                <React.Fragment key={skill.id || index}>
                  <Text style={{
                  fontWeight: '300', 
                  fontSize: 14, 
                  lineHeight: 21, 
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  padding: 10,
                  marginBottom: 15,
                  fontFamily: 'GothamRounded-Medium', 
                  color:  index === 0 ? '#B11515' : 
                          index === 1 ? '#195EC6' : 
                          index === 2 ? '#D6A938' : 
                          index === 3 ? '#A656D7' : 
                          index === 4 ? '#488E10' : 
                          index === 5 ? '#9F0B6D' : '#000',
                  backgroundColor:  index === 0 ? '#F2D9D8' : 
                                    index === 1 ? '#E3E1EB' : 
                                    index === 2 ? '#F6E9DD' : 
                                    index === 3 ? '#F2E1EC' : 
                                    index === 4 ? '#E8E6D9' : 
                                    index === 5 ? '#F1D9E2' : '#000'
                }} key={index}>
                  {skill}
                </Text>
                <TouchableOpacity onPress={() => handleRemoveSkill(index)} style={{
                  padding: 10,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  marginRight: 15,
                  marginBottom: 15,
                  backgroundColor:  index === 0 ? '#F2D9D8' : 
                                    index === 1 ? '#E3E1EB' : 
                                    index === 2 ? '#F6E9DD' : 
                                    index === 3 ? '#F2E1EC' : 
                                    index === 4 ? '#E8E6D9' : 
                                    index === 5 ? '#F1D9E2' : '#000'
                }}>
                  <Image source={Images.close_circle} style={Styles.authIconWidth}/>
                </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
          </View>
          
          {
            errorResponseText ? (
              <Text style={[Styles.fontBlack16, Styles.fontBook16, Styles.mt30, { color: Colors.textDanger }]}>
                {errorResponseText}
              </Text>
            ) : (
              errorResponseBirth ? (
                <Text style={[Styles.fontBlack16, Styles.fontBook16, Styles.mt30, { color: Colors.textDanger }]}>
                  {errorResponseBirth}
                </Text>
              ) : null
            )
          }


          {
            FirstName && LastName && Email && PhoneNumber && Password && ConfirmPassword && NewDate && Address && About && Experience && Price && Skills  ?
              <TouchableOpacity onPress={HomeCareSignUpAPI} style={[Styles.btnBlue, Styles.mt20]}>
                  <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.SignUp}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity disabled={true} style={[Styles.btnDisable, Styles.mt20]}>
                <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.SignUp}</Text>
              </TouchableOpacity>
          }


          <View style={[Styles.flexRow, Styles.mb20]}>
            <Text style={[ Styles.fontBook14]}>{Strings.HaveAccount}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('HomeCareSignIn')}>
              <Text style={[Styles.fontBlue14, Styles.pl10]}>{Strings.SignIn}</Text>
            </TouchableOpacity>
          </View>
        </View>
    </ScrollView>

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
      </View>
    </BottomSheet>

    </>
  );
}

export default HomeCareSignUp;




