import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View, PermissionsAndroid, ActivityIndicator } from 'react-native';
import AppBg from '../../Common/AppBg';
import Styles from '../../Styles/Styles';
import Images from '../../Constant/Images';
import Strings from '../../Constant/Strings';
import { Dropdown } from 'react-native-element-dropdown';
import { CaretakerPerson } from '../../Api/Method';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CaretakerId, setToken } from '../../Api/PreferenceData';
import Colors from '../../Theme/Colors';
import { BottomSheet } from 'react-native-btr';
import {launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions} from 'react-native-image-picker'
import SuccessfullyMsg from '../../Common/SuccessfullyMsg';
import { useFocusEffect } from '@react-navigation/native';
import LoadingOverlay from './LoadingOverlay';

const AddCategory = ({ navigation }: { navigation: any }) => {

  const gender = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
    { label: 'Other', value: '3' }
  ]
  const Education = [
    { label: 'BAcc', value: '1' },
    { label: 'BArch', value: '2' },
    { label: 'BBA', value: '3' },
    { label: 'BComm', value: '4' },
    { label: 'BCS', value: '5' },
    { label: 'BCA', value: '6' },
    { label: 'BCL', value: '7' }
  ]

  const MedicalCondition = [
    { label: 'None', value: '1' },
    { label: 'Acute cholecystitis', value: '2' },
    { label: 'Acne', value: '3' }
  ]

  const [Name, setName] = useState('');
  const [Age, setAge] = useState('');
  const [GenderValue, setGenderValue] = useState<string | null>(null);
  const [EducationValue, setEducationValue] = useState('');
  const [MedicalConditionValue, setMedicalConditionValue] = useState('');
  const [OtherDetails, setOtherDetails] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectCamera, setSelectCamera] = useState<any>('')
  const [selectGallery, setSelectGallery] = useState<any>('')
  const [loading, setLoading] = useState(false)
  const [uploadName, setUploadName] = useState<any>('')

  const [IDProof, setIDProof] = useState<string | null>(null)

  const [visible, setVisible] = useState(false)
  const [errorResponseText, setErrorResponseText] = useState('')

  const [NameFocusBorder, setNameFocusBorder] = useState('#FFF')
  const [AgeFocusBorder, setAgeFocusBorder] = useState('#FFF')

  const [NameFocusIcon, setNameFocusIcon] = useState(false)
  const [AgeFocusIcon, setAgeFocusIcon] = useState(false)


  const handleNameFocusIcon = () => { setNameFocusIcon(!NameFocusIcon) }
  const handleAgeFocusIcon = () => { setAgeFocusIcon(!AgeFocusIcon) }

  const customFocusName = () => { setNameFocusBorder('#03849C') }
  const customFocusAge = () => { setAgeFocusBorder('#03849C') }

  const customBlurName = () => { setNameFocusBorder('#FFF') }
  const customBlurAge = () => { setAgeFocusBorder('#FFF') }

  const handleNameChange = (text: any) => {
    const regex = /^[a-zA-Z]+$/;
    if (regex.test(text)) {
      setName(text);
    }
  };



  const getTokenApi = async() => {
    const value = await AsyncStorage.getItem('token')
    setToken(value)
  }
  

  const GenderNavigation = () => {
    setSelectCamera('')
    setSelectGallery('')
    setIsVisible(true)
  };

  const optionCamera: CameraOptions = {
    mediaType: 'photo',
    // fileSize: FileSize,
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
    setIsVisible(false);
  }

  const optionGallery: ImageLibraryOptions = {
    mediaType: 'photo',
    // fileSize: FileSize,
  }
  const openGallery = () => {
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
    setIsVisible(false);
  }


  const AddUserCategory = async() => {

    const formData = new FormData();
    setLoading(true)
    formData.append('fullname', Name)
    formData.append('user_id', '2')
    formData.append('category_id', '1')
    formData.append('age', Age)
    formData.append('gender', GenderValue)
    formData.append('education', EducationValue)
    formData.append('medical_condition', MedicalConditionValue)
    formData.append('other_details', OtherDetails)
    formData.append('status', '1')
    if (IDProof !== null) {
      if (IDProof.endsWith('.jpg') || IDProof.endsWith('.jpeg') || IDProof.endsWith('.png')) {
        formData.append('profile_pic', {
          uri: IDProof,
          type: 'image/jpeg',
          name: uploadName,
        });
      } else if (IDProof.endsWith('.pdf')) {
        formData.append('profile_pic', {
          uri: IDProof,
          type: 'application/pdf',
          name: uploadName,
        });
      }
    } else {
      console.log('IDProof is null');
    }
    console.log('Add Category formData ====>', formData);


    try {     
      setLoading(true)
      const response = await CaretakerPerson(formData)
      setErrorResponseText(response?.data?.ResponseText)  
      setLoading(false)
      console.log('formData ===>', JSON.stringify(formData));
      console.log('API response true =====>', JSON.stringify(response));
      if(response.status === true) {
        setVisible(true)
        const caretaker_id = response?.data?.ResponseData?.category_id
        const homecare_id = response?.data?.ResponseData?.id
        const user_id = response?.data?.ResponseData?.user_id
        if(caretaker_id !== null && caretaker_id !== undefined && homecare_id !== null && homecare_id !== undefined && user_id !== null && user_id !== undefined){
          try {
            await AsyncStorage.setItem('caretaker_id', caretaker_id.toString());
            await AsyncStorage.setItem('homecare_id', homecare_id.toString());
            await AsyncStorage.setItem('user_id', user_id.toString());
            console.log('caretaker_id ========================>', caretaker_id);
            console.log('homecare_id ===================================>', homecare_id);
            console.log('user id ===================================>', user_id);
          } catch (error) {
            console.error('Error storing CaretakerId in AsyncStorage:', error);
          }            
        }
        setTimeout(() => {
          navigation.navigate('ViewCategory', {
            Profile: IDProof,
            fullname : Name,
            age : Age,
            gender : GenderValue,
            OtherDetails : OtherDetails,
          })
        }, 3000);
      }
      // if (response.status === false && response.data && response.data.ResponseData && response.data.ResponseData.errors) {
      //   const validationErrors = response.data.ResponseData.errors;
      //   console.log('Validation Errors:', validationErrors);
      // } else {
      //   console.log('API response false =====>', response);
        
      // } 
    } catch (error) {
      console.log('API response false =====>', error);     
    }
  }

  useEffect(() => {     
    getTokenApi()
  }, [])

  const handleBack = () => {
    navigation.goBack();
  }

  const closeModal = () => {
    setVisible(false)
    navigation.navigate('ViewCategory')
  }

  

  return (
    <>
        <AppBg />

        <View style={Styles.headerBox}>
            <TouchableOpacity onPress={handleBack}>
              <Image source={Images.back} style={Styles.backIcon}/>
            </TouchableOpacity>
            <Text style={Styles.headerTitle}>{Strings.Add}</Text>
            <Text></Text>
        </View>

        <ScrollView>

          <View style={[Styles.marginHorizontal15, Styles.mt20]}>

            <View style={Styles.alignItemCenter}>
              <View style={{position: 'relative'}}>

                {selectGallery ? (
                <>
                  <Image source={{ uri: selectGallery }} style={Styles.loginBrand} />
                  <TouchableOpacity onPress={GenderNavigation} style={{position: 'absolute', right: -20, bottom: -15}}>
                    <Image source={Images.ProfileEdit} style={Styles.uploadEdit}/>
                  </TouchableOpacity>
                </>
              ) : selectCamera ? (
                <>
                    <Image source={{ uri: selectCamera }} style={Styles.loginBrand} />
                    <TouchableOpacity onPress={GenderNavigation} style={{position: 'absolute', right: -20, bottom: -15}}>
                    <Image source={Images.ProfileEdit} style={Styles.uploadEdit}/>
                  </TouchableOpacity>
                    
                  </>
              ) : (
                <>
                  <Image source={Images.avatar} style={Styles.loginBrand} />
                  <TouchableOpacity onPress={GenderNavigation} style={{position: 'absolute', right: -20, bottom: -15}}>
                    <Image source={Images.ProfileEdit} style={Styles.uploadEdit}/>
                  </TouchableOpacity>
                </>
              )
            }

              </View> 
              
            </View>

            <View style={[Styles.mb10, Styles.mt20]}>
              <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.FirstName}</Text>
              <View style={[Styles.formControl, { borderColor: NameFocusBorder, borderWidth: 2 }]}>
                {!NameFocusIcon ? 
                  <Image source={Images.name_gray} style={Styles.authIconWidth} /> 
                  : 
                  <Image source={Images.name_black} style={Styles.authIconWidth} />
                }
                <TextInput placeholder='John Smith'
                  style={[ Styles.fontBook14, Styles.CustomWidth, Styles.pl10, Styles.textBlack]}
                  onFocus={customFocusName}
                  onBlur={customBlurName}
                  onPressIn={handleNameFocusIcon}
                  placeholderTextColor='#818D8E'
                  keyboardType='ascii-capable'
                  value={Name}
                  onChangeText={handleNameChange}
                />
              </View>
            </View>

            <View style={Styles.mb10}>
              <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.Age}</Text>
              <View style={[Styles.formControl, { borderColor: AgeFocusBorder, borderWidth: 2 }]}>
                {!AgeFocusIcon ? 
                  <Image source={Images.age_gray} style={Styles.authIconWidth} /> 
                  :
                  <Image source={Images.age_black} style={Styles.authIconWidth} />
                }
                <TextInput placeholder='Enter child age'
                  style={[ Styles.fontBook14, Styles.CustomWidth, Styles.pl10, Styles.textBlack]}
                  onFocus={customFocusAge}
                  onBlur={customBlurAge}
                  onPressIn={handleAgeFocusIcon}
                  placeholderTextColor='#818D8E'
                  keyboardType='numeric'
                  value={Age}
                  onChangeText={text => setAge(text)}
                />
              </View>
            </View>

            <View style={Styles.mb20}>
              <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.Gender}</Text>
              <Dropdown
                style={[Styles.boxShadow, Styles.height55, Styles.mt10]}
                data={gender}
                labelField="label"
                valueField="value"
                placeholder="Male"
                value={GenderValue}
                onChange={text => setGenderValue(text.value)}
                renderItem={(item) => {
                  return (
                    <View style={[Styles.flexRow, Styles.pb10, Styles.pt10, Styles.justifyStart, Styles.pl20]}>
                      <Text style={[Styles.fontGray16, Styles.fontBook16]}>{item.label}</Text>
                    </View>
                  );
                }}
              />
            </View>

            <View style={Styles.mb20}>
              <View style={[Styles.flexRow, Styles.JustifyBetween]}>
                <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.Education}</Text>
                <Text style={[ Styles.fontBook14]}>{Strings.Optional}</Text>
              </View>
              <Dropdown
                style={[Styles.boxShadow, Styles.height55, Styles.mt10]}
                data={Education}
                labelField="label"
                valueField="value"
                placeholder="Select here"
                value={EducationValue}
                onChange={text => setEducationValue(text.value)}
                renderItem={(item) => {
                  return (
                    <View style={[Styles.flexRow, Styles.pb10, Styles.pt10, Styles.justifyStart, Styles.pl20]}>
                      <Text style={[Styles.fontGray16, Styles.fontBook16]}>{item.label}</Text>
                    </View>
                  );
                }}
              />
            </View>

            <View style={Styles.mb20}>
              <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.MedicalCondition}</Text>
              <Dropdown
                style={[Styles.boxShadow, Styles.height55, Styles.mt10]}
                data={MedicalCondition}
                labelField="label"
                valueField="value"
                placeholder="None"
                value={MedicalConditionValue}
                onChange={text => setMedicalConditionValue(text.value)}
                renderItem={(item) => {
                  return (
                    <View style={[Styles.flexRow, Styles.pb10, Styles.pt10, Styles.justifyStart, Styles.pl20]}>
                      <Text style={[Styles.fontGray16, Styles.fontBook16]}>{item.label}</Text>
                    </View>
                  );
                }}
              />
            </View>

            <View style={Styles.mb10}>
              <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>{Strings.OtherDetails}</Text>
              <View style={Styles.formControl}>
                <TextInput placeholder='He is very creative and he loves art.' 
                  value={OtherDetails}
                  placeholderTextColor='#818D8E'
                  onChangeText={text => setOtherDetails(text)}
                  numberOfLines={4} 
                  style={[ Styles.CustomWidth, Styles.pl10, Styles.textBlack, Styles.fontBook14, { textAlignVertical: 'top' }]}
                />
              </View>
            </View>

            {errorResponseText && <Text style={[errorResponseText ? Styles.mt20: null, Styles.fontBlack16,Styles.fontBook16, {color: Colors.textDanger}]}>{errorResponseText}</Text>}

            
            {
            Name && Age && GenderValue && EducationValue && MedicalConditionValue && OtherDetails ?
              <TouchableOpacity onPress={AddUserCategory} style={[Styles.btnBlue]}>
                {loading ?
                    <ActivityIndicator size='small' color='#FFF'/> 
                  :
                  <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.Save}</Text>
                }
              </TouchableOpacity>
              :
              <TouchableOpacity disabled={true} style={[Styles.btnDisable, Styles.mt20]}>
                <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.SignUp}</Text>
              </TouchableOpacity>

          } 

          </View>

        </ScrollView>


        <BottomSheet visible={isVisible}>
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

      <SuccessfullyMsg visible={visible}>
        <View style={{position: 'relative'}}>

          <TouchableOpacity style={{position: 'absolute', right: -35, top: -15}} onPress={closeModal}>
            <Image source={Images.fill_delete} style={{width: 38, height: 38}}/>
          </TouchableOpacity>

          <Image source={Images.alert_bg} style={{width: '100%', height: 132}}/>

          <View style={{alignItems: 'center'}}>
            <Image source={Images.alert_done} style={Styles.recentPic}/>
            <Text style={[Styles.fontBlackMedium24, Styles.marginVertical20, Styles.fontMedium24]}>Congratulations!</Text>
            <Text style={{fontFamily: 'GothamRounded-Book', fontWeight: '400', fontSize: 18, lineHeight: 25}}>{Strings.CreatePersonMsg}</Text>
          </View>

        </View>

      </SuccessfullyMsg>

      <LoadingOverlay visible={loading}/>

    </>
  );
}



export default AddCategory;


