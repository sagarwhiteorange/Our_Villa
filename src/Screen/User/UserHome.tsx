import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import Styles from '../../Styles/Styles';
import { Path, Svg } from 'react-native-svg';
import Images from '../../Constant/Images';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 

import AppBg from '../../Common/AppBg';
import Strings from '../../Constant/Strings';
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeCarePersonList } from '../../Api/Method';

enum Url {
  UserProfile = 'UserProfile',
}

const UserHome = (props: any) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()
  const isFocused = useIsFocused() 

  const [userAddress, setUserAddress] = useState<any>('')

  const getAddress = async () => {
    try {
      const userAddress = await AsyncStorage.getItem('Address');
      setUserAddress(userAddress)
      console.log('Retrieved address from AsyncStorage: ', userAddress);
    } catch (error) {
      console.error('Error retrieving address from AsyncStorage: ', error);
    }
  };

  getAddress();
    

  const [Gender, setGender] = useState(false);
  const [BookSitter, setBookSitter] = useState(false);
  const [selectUser, setSelectUser] = useState(1)
  const [token, setToken] = useState<string | null>(null)
  const [homeCarePerson, setHomeCarePerson] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handlePress = (index: number, item: any) => {
    setSelectedItem(index);
    setUserID(item.id)
    setSlug(item.slug)
  };
  
  
  const GenderNavigation = () => {
    setGender(!Gender);
  };

  const SelectGender = () => {
    console.log('SelectGender');
    setGender(!Gender);
  }

  const BookSitterNavigation = () => {
    setBookSitter(!Gender);
  };

  // const SelectBookSitter = () => {
  //   setBookSitter(!BookSitter);
  //   navigation.navigate('UserProfile')
  // }

  const getTokenApi = async() => {
    const value = await AsyncStorage.getItem('token')
    setToken(value)
    GetUserProfile()
  }

  const [UserID, setUserID] = useState('')
  const [Slug, setSlug] = useState('')

  const GetUserProfile = async() => {
    const params = {
      Authorization: token,
    }
    try {
      const response = await HomeCarePersonList(params)
      setHomeCarePerson(response?.data?.ResponseData?.HomeCarePerson)
      setUserID(response?.data?.ResponseData?.HomeCarePerson[0]?.id)
      setSlug(response?.data?.ResponseData?.HomeCarePerson[0]?.slug)
      console.log('response ==============>', response);      
    } catch (error) {
      console.log('Get User Profile =========>', error);      
    }
  }


  useEffect(()=>{
    getTokenApi()
  },[navigation , isFocused])



  const GetUserList = ({item, index} : {item: any, index: any}) => {
    const isSelected = selectedItem === index;
    return(
      <TouchableOpacity key={index.id} onPress={() => handlePress(index, item)}>
          <View style={[Styles.bookingCart, Styles.height6_5, Styles.marginHorizontal20, Styles.marginVertical10, isSelected ? styles.clicked : null]}>
          <View style={[Styles.flexRow, Styles.alignStart]}>
            {
              item?.profile_pic ? (
                <Image source={{uri: item?.profile_pic}} style={[Styles.profile, Styles.loginBrand]} />
              ) : 
              <Image source={Images.avatar} style={[Styles.profile, Styles.loginBrand]} />
            }

            <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.alignStart,]}>
              <View>
                <Text style={[Styles.fontBlack18, Styles.fontMedium18]}>{item?.fullname}</Text>
                <View style={[Styles.alignCenter, Styles.mt5]}>
                  <Image source={Images.fill} style={Styles.star} />
                  <Image source={Images.fill} style={Styles.star} />
                  <Image source={Images.fill} style={Styles.star} />
                  <Image source={Images.fill} style={Styles.star} />
                  <Image source={Images.unFill} style={Styles.star} />
                </View>
                <View style={[Styles.alignCenter, Styles.marginVertical5]}>
                  <Image source={Images.experience} style={Styles.BookingIcon} />
                  <Text style={[ Styles.fontBook16,Styles.MaxWidth180]}>{item?.experience} years experience</Text>
                </View>
                <View style={Styles.alignCenter}>
                  <Image source={Images.teacher} style={Styles.BookingIcon} />
                  <Text style={[ Styles.fontBook14,Styles.MaxWidth180]}>{item?.certified}</Text>
                </View>
              </View>

              <View style={[Styles.alignCenter, Styles.mt5, Styles.mr10]}>
                <Text style={[Styles.fontGreen16, Styles.fontMedium16]}>${item?.price}/hr</Text>
              </View>
            </View>
          </View>
        </View>
        </TouchableOpacity>
    )
  }
  


  return (
    <>
      <AppBg />
        <View style={[Styles.headerBox, {height: 110}]}>
            <View>
              <View style={[Styles.flexRow, Styles.justifyStart]}>
                  <Image source={Images.location_gray} style={{width: 18, height: 18, marginRight: 10}}/>
                  <Text style={[Styles.fontBlack14, Styles.marginVertical10, Styles.fontBook14]}>{Strings.CurrentLocation}</Text>
              </View>
              <Text style={[Styles.fontMedium16, {color: '#000', lineHeight: 25, maxWidth: Dimensions.get('screen').width / 1.3}]}>{userAddress}</Text>
            </View>
          <TouchableOpacity onPress={() => navigation.navigate('UserFilter')}>
              <Image source={Images.filter} style={Styles.searchIcon}/>
          </TouchableOpacity>
        </View>
        <View>
          <MapView style={{height: Dimensions.get('window').height / 1.1 }}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: 45.50134432701386, 
              longitude: -73.56721162377846,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            >
            <Marker
              coordinate={{
                latitude: 45.50134432701386, 
                longitude: -73.56721162377846,
              }}
              image={Images.map_user}
              >
              <Callout tooltip>
                <View style={[Styles.boxShadow]}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[Styles.fontBlack16, Styles.fontBook16,]}> John Smith, 24</Text>
                    <View style={{marginLeft: 15, borderWidth: 1, borderColor: '#CCCCCC', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10}}>
                      <Text><Image source={Images.fill} style={{width: 14, height: 14,}} resizeMode="contain" /></Text>
                      <Text style={[Styles.fontBlack14, Styles.fontBook14, {marginLeft: 5}]}>4.5</Text>
                    </View>
                  </View>
                  <Text style={[ Styles.mt10, Styles.fontBook14]}>3+ years experience</Text>
                </View>
              </Callout>          
          </Marker>
            
          </MapView>
        </View>

        <View style={{position: 'absolute', top: 130, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          
          <TouchableOpacity style={[Styles.boxShadow, Styles.alignItemCenter, {width: '45%', marginHorizontal: 10}]} onPress={BookSitterNavigation}>
            <Text style={Styles.fontMedium16}>Book a sitter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[Styles.boxShadow, Styles.alignItemCenter, {width: '45%', marginHorizontal: 10}]} onPress={GenderNavigation}>
            <Text style={Styles.fontMedium16}>Male</Text>
          </TouchableOpacity>
        
        </View>
        

        <BottomSheet visible={Gender}>

          <View style={styles.bottomNavigationView}>

            <Text style={[Styles.fontBlack18, Styles.textCenter, Styles.marginVertical20, Styles.fontMedium18]}>Select gender</Text>
            
            <TouchableOpacity style={styles.modelText} onPress={() => setSelectUser(1)}>
              <Text style={{ position: 'relative' }}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                  <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                </Svg>
              </Text>

              {selectUser === 1 ? 
                <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                  </Svg>
                </Text> 
                : 
                null
              }

              <Text style={[Styles.fontBlack16,Styles.fontBook16, { marginLeft: 10 }]}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modelText} onPress={() => setSelectUser(2)}>

              <Text style={{ position: 'relative' }}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                  <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                </Svg>
              </Text>

              {selectUser === 2 ? 
                <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                  </Svg>
                </Text> 
                : 
                null
              }

              <Text style={[Styles.fontBlack16,Styles.fontBook16, { marginLeft: 10 }]}>Female</Text>
            
            </TouchableOpacity>

            <TouchableOpacity style={styles.modelText} onPress={() => setSelectUser(3)}>
              <Text style={{ position: 'relative' }}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                  <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                </Svg>
              </Text>

              {selectUser === 3 ? 
                <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                  </Svg>
                </Text> 
                : 
                null
              }

              <Text style={[Styles.fontBlack16,Styles.fontBook16, { marginLeft: 10 }]}>Male & Female (Both)</Text>
            
            </TouchableOpacity>

            <TouchableOpacity style={styles.modelText} onPress={() => setSelectUser(4)}>
              <Text style={{ position: 'relative' }}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                  <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                </Svg>
              </Text>

              {selectUser === 4 ? 
                <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                  </Svg>
                </Text> 
                : 
                null
              }

              <Text style={[Styles.fontBlack16,Styles.fontBook16, { marginLeft: 10 }]}>Single parent male</Text>
            
            </TouchableOpacity>

            <TouchableOpacity style={styles.modelText} onPress={() => setSelectUser(5)}>
              <Text style={{ position: 'relative' }}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                  <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                </Svg>
              </Text>

              {selectUser === 5 ? 
                <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                  </Svg>
                </Text> 
                : 
                null
              }

              <Text style={[Styles.fontBlack16,Styles.fontBook16, { marginLeft: 10 }]}>Single parent female</Text>
            
            </TouchableOpacity>

            <TouchableOpacity style={styles.modelText} onPress={() => setSelectUser(6)}>
              <Text style={{ position: 'relative' }}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                  <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                </Svg>
              </Text>

              {selectUser === 6 ? 
                <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                  </Svg>
                </Text> 
                : 
                null
              }

              <Text style={[Styles.fontBlack16,Styles.fontBook16, { marginLeft: 10 }]}>Single parent male & female (Both)</Text>
            
            </TouchableOpacity>

            <TouchableOpacity style={styles.modelText} onPress={() => setSelectUser(7)}>

              <Text style={{ position: 'relative' }}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                  <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                </Svg>
              </Text>

              {selectUser === 7 ? 
                <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                    <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                  </Svg>
                </Text> 
                : 
                null
              }

              <Text style={[Styles.fontBlack16,Styles.fontBook16, { marginLeft: 10 }]}>Any one</Text>
            </TouchableOpacity>

            <View style={[Styles.marginHorizontal25, Styles.mt20]}>
              <TouchableOpacity onPress={SelectGender} style={[Styles.btnBlue, {marginBottom: 0}]}>
                <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.Save}</Text>
              </TouchableOpacity>
            </View>


          </View>

        </BottomSheet>

        <BottomSheet visible={BookSitter}>
          <View style={styles.BookSitterView}>
            <Text style={[Styles.fontBlack18, Styles.textCenter, Styles.mt20, Styles.fontMedium18]}>Select a babysitter</Text>
            <FlatList
              data={homeCarePerson}
              // keyExtractor={(item, index) => item.id.toString() || index.toString()}
              renderItem={({item, index}) => (
                <GetUserList item={item} index={index} key={index.toString()} />
              )}
            />
            
            <View style={[Styles.marginHorizontal25, Styles.mt20, Styles.mb20]}>
              <TouchableOpacity onPress={() =>  navigation.navigate('UserProfile', {id: UserID, slug: Slug})} style={Styles.btnBlue}>
                  <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.BookNow}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>

       
    </>
  );
};

export default UserHome;

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '95%',
    height: Dimensions.get('window').height / 1.90,
    marginHorizontal: 10,
    borderRadius: 12,
    marginBottom: 15
  },
  BookSitterView: {
    backgroundColor: '#fff',
    width: '100%',
    height: Dimensions.get('window').height / 1.4,
    borderTopLeftRadiusRadius: 20,
    borderTopRightRadiusRadius: 20,
  },
  modelText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 20
  },
  clicked: {
    borderColor: '#03849C', // Apply a different border color when clicked
  },
});
