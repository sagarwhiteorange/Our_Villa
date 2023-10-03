import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Images from '../../Constant/Images';
import Styles from '../../Styles/Styles';
import AppBg from '../../Common/AppBg';
import Strings from '../../Constant/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookingCurrent, BookingPast, BookingUpComing } from '../../Api/Method';


const HomeCareBooking = () => {

  const [UserID, setUserID] = useState<any>('')
  const [PastUser, setPastUser] = useState<any>('')
  const [bookingPast, setBookingPast] = useState(false);
  const [bookingCurrent, setBookingCurrent] = useState(false);
  const [bookingUpComing, setBookingUpComing] = useState(false);
  
  const getTokenApi = async() => {
    const value = await AsyncStorage.getItem('UserID')
    if(value) {
      const parsedValue = JSON.parse(value)
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
        <View style={Styles.bookingCart}>
          <View style={{flexDirection: 'row'}}>
            <View>
              {item.homecareperson.profile_pic ? 
                <Image source={{uri: item?.homecareperson?.profile_pic}} style={[Styles.profile, {backgroundColor: 'pink'}]} />
                :
                <Image source={Images.avatar} style={Styles.profile} />
              }
            </View>
            <View>
              <Text style={[Styles.fontBlack18, Styles.fontMedium18]}>{item?.homecareperson?.fullname}</Text>
              <View style={[Styles.alignCenter, Styles.marginVertical10]}>
                <Image source={Images.address} style={Styles.BookingIcon} />
                <Text style={[ Styles.MaxWidth180, Styles.fontBook14]}>{item?.homecareperson?.address}</Text>
              </View>
            </View>
          </View>
          <View style={Styles.VerticalLine}></View>
          <View style={Styles.flexBetween}>
            <View style={Styles.ItemCenter}>
              <Image source={Images.clock} style={Styles.BookingIcon} />
              <Text style={[Styles.fontBlack14, Styles.fontBook14]}>{item?.homecareperson?.days} days</Text>
            </View>
            <View style={Styles.ItemCenter}>
              <Image source={Images.children} style={Styles.BookingIcon} />
              <Text style={[Styles.fontBlack14, Styles.fontBook14]}>{item?.homecareperson?.Children} Children</Text>
            </View>
            <View style={Styles.ItemCenter}>
              <Image source={Images.home} style={Styles.BookingIcon} />
              <Text style={[Styles.fontBlack14, Styles.fontBook14]}>{item?.homecareperson?.home} At home</Text>
            </View>
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

export default HomeCareBooking;


