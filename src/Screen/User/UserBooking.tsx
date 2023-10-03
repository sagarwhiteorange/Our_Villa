import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Images from '../../Constant/Images';
import Styles from '../../Styles/Styles';
import AppBg from '../../Common/AppBg';
import Strings from '../../Constant/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookingCurrent, BookingPast, BookingUpComing } from '../../Api/Method';


const UserBooking = () => {

  const [UserID, setUserID] = useState<any>('')
  const [PastUser, setPastUser] = useState<any>('')
  const [bookingPast, setBookingPast] = useState(false);
  const [bookingCurrent, setBookingCurrent] = useState(false);
  const [bookingUpComing, setBookingUpComing] = useState(false);
  
  const getTokenApi = async() => {
    const value = await AsyncStorage.getItem('UserID')
    if(value) {
      const parsedValue = JSON.parse(value)
      console.log('parsedValue =============================', parsedValue)  
      setUserID(parsedValue)    
    } else {
      console.log('UserID Not Found =====>')
    }
  }

  useEffect(() => {     
    getTokenApi()
  }, [])

  const BookingPastAPI = async() => {
    const params = {
      user_id: UserID
    }
    try {
      const response = await BookingPast(params)
      setPastUser(response?.data?.ResponseData)
      setBookingPast(true)
      setBookingCurrent(false)
      setBookingUpComing(false)
      console.log('Booking Post Api response', response?.data?.ResponseData);     
    } catch (error) {
      console.log('Booking Post Api error ================>',error);      
    }
  }

  const BookingCurrentAPI = async() => {
    const params = {
      user_id: UserID
    }
    try {
      const response = await BookingCurrent(params)
      setUserID(response?.data?.ResponseData)
      setBookingCurrent(true)
      setBookingPast(false)
      setBookingUpComing(false)
      console.log('Booking Current Api response', response?.data?.ResponseData);     
    } catch (error) {
      console.log('Booking Current Api error ================>',error);      
    }
  }

  const BookingUpComingAPI = async() => {
    const params = {
      user_id: UserID
    }
    try {
      const response = await BookingUpComing(params)
      setUserID(response?.data?.ResponseData)
      setBookingUpComing(true)
      setBookingPast(false)
      setBookingCurrent(false)
      console.log('Booking UpComing Api response', response?.data?.ResponseData);     
    } catch (error) {
      console.log('Booking UpComing Api error ================>',error);      
    }
  }


  useEffect(() => {
    BookingPastAPI()
  }, [])

  const RenderItemComponent = ({ item, index }: { item: any, index: any }) => {
    return (
      <View key={index}>

        <View style={[Styles.bookingCart, Styles.height6_5]}>

          <View style={[Styles.flexRow, Styles.justifyStart]}>
              {item.homecareperson.profile_pic ? 
                <Image source={{uri: item?.homecareperson?.profile_pic}} style={[Styles.profile, {backgroundColor: 'pink'}]} />
                :
                <Image source={Images.avatar} style={Styles.profile} />
              }
            
            <View style={[ Styles.JustifyBetween, { width: Dimensions.get('screen').width / 1.8 }]}>                
              <Text style={[Styles.fontBlack18, Styles.fontMedium18]}>{item?.homecareperson?.fullname}</Text>
              <View style={[Styles.alignCenter, Styles.mt5]}>
                <Image source={Images.fill} style={Styles.star} />
                <Image source={Images.fill} style={Styles.star} />
                <Image source={Images.fill} style={Styles.star} />
                <Image source={Images.fill} style={Styles.star} />
                <Image source={Images.unFill} style={Styles.star} />
              </View>

              <View style={[Styles.alignCenter, Styles.marginVertical5]}>
                <Image source={Images.experience} style={Styles.BookingIcon} />
                <Text style={[ Styles.MaxWidth180, Styles.fontBook14]}>
                  {item?.homecareperson?.experience} years experience
                </Text>
              </View>

              <View style={Styles.alignCenter}>
                <Image source={Images.teacher} style={Styles.BookingIcon} />
                <Text style={[ Styles.MaxWidth180, Styles.fontBook14]}>
                  {item?.homecareperson?.certified}
                </Text>
              </View>
              

            </View>
            <Image source={Images.next} style={Styles.BookingIcon} />

          </View>

        </View>

      </View>
    )
  }

  return (
    <View>

      <AppBg />

      <View style={Styles.headerBox}>
          <Text></Text>
          <Text style={Styles.headerTitle}>{Strings.Booking}</Text>
          <TouchableOpacity>
              <Image source={Images.search} style={Styles.searchIcon}/>
          </TouchableOpacity>
      </View>

        <View style={[Styles.marginHorizontal15]}>
          <View style={Styles.tabBar}>
            <TouchableOpacity onPress={BookingPastAPI} 
              style={[Styles.btnTab, {backgroundColor: bookingPast ? '#03849C' : 'transparent'}]}>
              <Text style={[Styles.fontTabGray16,Styles.fontMedium16, {color: bookingPast ? '#fff' : '#919D9E'}]}>Past</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={BookingCurrentAPI} 
              style={[Styles.btnTab, {backgroundColor: bookingCurrent ? '#03849C' : 'transparent'}]}>
              <Text style={[Styles.fontTabGray16,Styles.fontMedium16, {color: bookingCurrent ? '#fff' : '#919D9E'}]}>Current</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={BookingUpComingAPI} 
              style={[Styles.btnTab, {backgroundColor: bookingUpComing ? '#03849C' : 'transparent'}]}>
              <Text style={[Styles.fontTabGray16,Styles.fontMedium16, {color: bookingUpComing ? '#fff' : '#919D9E'}]}>UpComing</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={PastUser}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RenderItemComponent item={item} index={undefined} />}
          />
        </View>
    </View>
  );
}


export default UserBooking;


