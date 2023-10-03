import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppBg from '../../Common/AppBg';
import Styles from '../../Styles/Styles';
import Strings from '../../Constant/Strings';
import Images from '../../Constant/Images';
import { Path, Svg } from 'react-native-svg';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BookingAdd } from '../../Api/Method';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessfullyMsg from '../../Common/SuccessfullyMsg';

enum Url {
  UserPayment = 'UserPayment',
}


const UserBookingDetails = (props: any) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()
  const price = props?.route?.params?.price

  const GetUserID = async() => {
    const caretaker_id = await AsyncStorage.getItem('caretaker_id')
    const homecare_id = await AsyncStorage.getItem('homecare_id')
    const user_id = await AsyncStorage.getItem('user_id')
    setuser_id(user_id)
    setcaretaker_id(caretaker_id)
    sethomecare_id(homecare_id)   
  }
  
  useEffect(() => {
    GetUserID()
  }, [])


  const [user_id, setuser_id] = useState<any>('')
  const [caretaker_id, setcaretaker_id] = useState<any>('')
  const [homecare_id, sethomecare_id] = useState<any>('')
  const [selectUser, setSelectUser] = useState(1)

  const [startDate, setStartDate] = useState<any>(new Date());
  const [StartNewDate, setStartNewDate] = useState('')
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [StartNewFormatDate, setStartNewFormatDate] = useState<any>('')

  const [endDate, setEndDate] = useState(new Date());
  const [endDateVisible, setEndDateVisible] = useState(false);
  const [EndNewDate, setEndNewDate] = useState('')
  const [EndNewFormatDate, setEndNewFormatDate] = useState<any>('')

  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [TotalHrs, setTotalHrs] = useState<string>('');
  const [TotalCount,setTotalCount] = useState<number | any>(null)
  const [PromoCode, setPromoCode] = useState('')
  const [TotalDay, setTotalDay] = useState<number | any>(null)
  
  const [PriceTotalHRS, setPriceTotalHRS] = useState<number | any>(null)
  const [TotalPrice, setTotalPrice] = useState<any>('')
  const [StartTimeFormat, setStartTimeFormat] = useState<any>('')
  const [EndTimeFormat, setEndTimeFormat] = useState<any>('')
  const [visible, setVisible] = useState(false)


  const StartDatePicker = () => {
    setStartDateVisible(true);
  };

  const hideStartDatePicker = (date: Date | null) => {
    if(date) {
      const formattedDate = formatDate(date);
      setStartNewDate(formattedDate)      
    }
    setStartDateVisible(false);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleConfirmStart = (date: Date) => {
    const formattedDate = formatDate(date);
    setStartDate(date);
    setStartNewFormatDate(formattedDate)
    hideStartDatePicker(date);
  };
  

  

  const EndDatePicker = () => {
    setEndDateVisible(true);
  };

  const hideEndDatePicker = (date: Date | null) => {
    if(date) {
      const formattedDate = formatDate(date);
      setEndNewDate(formattedDate)      
    }
    setEndDateVisible(false);
  };

  const handleConfirmEnd = (date: Date) => {
    if (startDate && date < startDate) {      
      return;
    } else {
      const formattedDate = formatDate(date);
      setEndDate(date);
      setEndNewFormatDate(formattedDate)
      hideEndDatePicker(date);
    }
  };

  

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };


  const handleStartTimeConfirm = (time: any) => {
    setStartTime(time);
    const selectedTime = new Date(time);
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const seconds = selectedTime.getSeconds();
    const FormatTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    setStartTimeFormat(FormatTime)
    hideStartTimePicker();
  };

  
  const handleEndTimeConfirm = (time: any) => {
    setEndTime(time);
    const selectedTime = new Date(time);
    const hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();
    const seconds = selectedTime.getSeconds();
    const FormatTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    setEndTimeFormat(FormatTime)
    hideEndTimePicker();
  };

  
  



  const CountTotalDay = () => {
    if (startDate && endDate && startDate <= endDate) {
      const timeDifferenceInMilliseconds = endDate.getTime() - startDate.getTime();
      const totalDays = Math.ceil(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
      setTotalDay(totalDays);
    } else {
      console.log('Please select both start and end dates, and ensure the start date is not after the end date.');
    }
  };

  useEffect(() => {
    CountTotalDay();
  }, [startDate, endDate]);

  const calculateTotalTime = () => {
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const timeDifferenceInMilliseconds = end - start;
      const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
      const TotalHours = `${hours}.${minutes}`
      setTotalHrs(TotalHours)
      return `${hours}.${minutes}`;
      
  }
  return 'Select both start and end times';
  };

  useEffect(() => { 
    const totalHours = calculateTotalTime()
    setTotalHrs(totalHours)
  }, [startTime, endTime])



  const TotalHrsDuration = () => {
    const CountTotal = TotalDay * TotalHrs;
    setTotalCount(CountTotal);
  };

  useEffect(() => {
    TotalHrsDuration()
  }, [TotalHrs,TotalDay, price]);

  const CountTotalHRS = () => {
    if (TotalDay !== null && typeof TotalHrs !== 'number') {
      const TotalHRS = TotalDay * TotalHrs;
      const roundedHours = parseFloat(TotalHRS.toFixed(2))
      setPriceTotalHRS(roundedHours);
    }
  };

  useEffect(() => {
    CountTotalHRS();
  }, [TotalDay, TotalHrs]);

  const GetTotalPrice = () => {
    if(!isNaN(PriceTotalHRS) && !isNaN(price)){
      const CountPrice = PriceTotalHRS * price
      const roundedPrice = parseFloat(CountPrice.toFixed(2))    
      setTotalPrice(roundedPrice)
    } else {
      console.log('PriceTotalHRS or price is NaN.')      
    }    
  }

  useEffect(() => {
    GetTotalPrice()
  }, [PriceTotalHRS, price]);
  

  

  const UserBookingAPI = async() => {
    const params = {
      "user_id" : user_id,
      "homecare_id" : homecare_id,
      "caretaker_id" : caretaker_id,
      "start_date": StartNewFormatDate,
      "end_date": EndNewFormatDate,
      "shift_start_time": StartTimeFormat,
      "shift_end_time": EndTimeFormat,
      "total_hours": TotalCount,
      "rate_per_hour": price,
      "total_amount": TotalPrice,
      "promocode": PromoCode
    }

    console.log('params =============================>', params);
    
    try {
      const response = await BookingAdd(params)
      console.log('User booking api call response', response);
      if(response) {
        setVisible(true)
        setTimeout(() => {
          navigation.navigate('UserPayment')
        }, 3000);
      }
    } catch (error) {
      console.log('User booking api call error', error);      
    }
  }


  const handleBack = () => {
    navigation.goBack();
  }

  const closeModal = () => {
    setVisible(false)
    navigation.navigate('UserPayment')
  }

  return (
    <>
        <AppBg />

        <View style={Styles.headerBox}>
            <TouchableOpacity onPress={handleBack}>
              <Image source={Images.back} style={Styles.backIcon}/>
            </TouchableOpacity>
            <Text style={Styles.headerTitle}>{Strings.BookingDetails}</Text>
            <Text></Text>
        </View>

        <ScrollView>

          <View style={[Styles.marginHorizontal15, Styles.mt20]}>
            <View>
              <Text style={[Styles.fontMedium16, Styles.marginVertical10]}>Select children</Text>
              <View style={[Styles.boxShadow, Styles.height6_5, Styles.alignCenter, { paddingTop: 0 }]}>
                <View style={Styles.recentPic}>
                  <Image source={Images.CategoryImg} style={Styles.recentPic} />
                  <Text style={[Styles.fontBlack14,Styles.fontBook14, Styles.textCenter]}>Ryan</Text>
                </View>
                <TouchableOpacity style={[Styles.recentPic, Styles.ml10]} 
                  onPress={() => navigation.navigate('EmptyCategory')}>
                  <View style={[Styles.recentPic, 
                    {borderWidth: 1, borderColor: '#D8DADB', borderRadius: 6, alignItems: 'center', justifyContent: 'center' }]}>
                    <Image source={Images.add} style={Styles.authIconWidth} />
                  </View>
                  <Text style={[Styles.fontBlack14,Styles.fontBook14, Styles.textCenter]}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={Styles.marginVertical20}>
              <Text style={Styles.fontMedium16}>Select date</Text>
              <View style={Styles.flexBetween}>
                <View style={{ width: '47%' }}>
                  <Text style={[Styles.fontBlack16,Styles.fontBook16, Styles.marginVertical10]}>Start date</Text>
                  <View style={[Styles.boxShadow, Styles.flexRow, Styles.flexBetween]}>
                    <Text style={[Styles.fontBlack16,Styles.fontBook16,]}>                     
                      {StartNewDate ?  StartNewDate : 'Start date'}
                    </Text>
                    <TouchableOpacity onPress={StartDatePicker}>                    
                    <Image source={Images.calendar_gray} style={Styles.authIconWidth} />
                  </TouchableOpacity>
                  </View>                  
                  <DateTimePickerModal
                    date={startDate}
                    isVisible={startDateVisible}
                    mode="date"
                    onConfirm={handleConfirmStart}
                    onCancel={hideStartDatePicker}
                    minimumDate={new Date()}
                  />
                </View>


                <View style={{ width: '47%' }}>
                  <Text style={[Styles.fontBlack16,Styles.fontBook16, Styles.marginVertical10]}>End date</Text>
                  <View style={[Styles.boxShadow, Styles.flexRow, Styles.flexBetween]}>
                    <Text style={[Styles.fontBlack16,Styles.fontBook16,]}>                     
                      {EndNewDate ?  EndNewDate : 'End date'}
                    </Text>
                    <TouchableOpacity onPress={EndDatePicker}>                    
                    <Image source={Images.calendar_gray} style={Styles.authIconWidth} />
                  </TouchableOpacity>
                  </View>                  
                  <DateTimePickerModal
                    date={endDate}
                    isVisible={endDateVisible}
                    mode="date"
                    onConfirm={handleConfirmEnd}
                    onCancel={() => hideEndDatePicker}
                    minimumDate={startDate}
                  />
                </View>
              </View>
            </View>

            <View style={Styles.mb20}>
              <Text style={Styles.fontMedium16}>Select time</Text>
              <View style={Styles.flexBetween}>
                <View style={{ width: '47%' }}>
                  <Text style={[Styles.fontBlack16,Styles.fontBook16, Styles.marginVertical10]}>Start time</Text>
                  <TouchableOpacity style={[Styles.boxShadow, Styles.flexRow, Styles.flexStart]} onPress={showStartTimePicker}>
                    <Image source={Images.calendar_gray} style={Styles.authIconWidth} />
                    <Text style={[Styles.fontBlack16, Styles.fontBook16, Styles.pl10]}>{startTime ? startTime.toLocaleTimeString() : 'Start time'}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={handleStartTimeConfirm}
                    onCancel={hideStartTimePicker}
                  />
                </View>
                <View style={{ width: '47%' }}>
                  <Text style={[Styles.fontBlack16, Styles.marginVertical10]}>End time</Text>
                  <TouchableOpacity style={[Styles.boxShadow, Styles.flexRow, Styles.flexStart]} onPress={showEndTimePicker}>
                    <Image source={Images.calendar_gray} style={Styles.authIconWidth} />
                    <Text style={[Styles.fontBlack16, Styles.fontBook16, Styles.pl10]}>{endTime ? endTime.toLocaleTimeString() : 'End time'}</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={handleEndTimeConfirm}
                    onCancel={hideEndTimePicker}
                  />
                </View>
              </View>
            </View>

            {/* <Text>Total Time: {calculateTotalTime()}</Text> */}

            <View style={Styles.mb10}>
              <Text style={Styles.fontMedium16}>Select location</Text>
              <View style={[Styles.flexRow, Styles.mt15, Styles.mb10, Styles.justifyStart]}>
                <TouchableOpacity style={Styles.flexRow} onPress={() => setSelectUser(1)}>
                  <Text style={{ position: 'relative' }}>
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                      <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 
                      15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 
                      10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 
                      2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 
                      15.6569C5.84344 17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                    </Svg>
                  </Text>
                  {selectUser === 1 ? 
                    <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                        <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 
                        15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 
                        10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 
                        2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 
                        15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 
                        13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 
                        8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 
                        11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                      </Svg>
                    </Text> 
                    : 
                    null
                  }
                  <Text style={selectUser === 1 ? 
                    [[Styles.fontBlack14,Styles.fontBook14, { marginLeft: 5 }]] 
                    : 
                    [[ Styles.fontBook14, { marginLeft: 5 }]]}>
                    At home
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity style={[Styles.flexRow, { marginLeft: 10 }]} onPress={() => setSelectUser(2)}>
                  <Text style={{ position: 'relative' }}>
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                      <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 
                      20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 
                      7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 
                      4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 
                      17.1571 7.87827 18 10 18V18Z" fill="#919D9E" />
                    </Svg>
                  </Text>

                  {selectUser === 2 ? 
                    <Text style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}>
                      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                        <Path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 
                        15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 
                        10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 
                        2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 
                        15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM10 15C8.67392 15 7.40215 14.4732 6.46447 
                        13.5355C5.52678 12.5979 5 11.3261 5 10C5 8.67392 5.52678 7.40215 6.46447 6.46447C7.40215 5.52678 
                        8.67392 5 10 5C11.3261 5 12.5979 5.52678 13.5355 6.46447C14.4732 7.40215 15 8.67392 15 10C15 
                        11.3261 14.4732 12.5979 13.5355 13.5355C12.5979 14.4732 11.3261 15 10 15V15Z" fill="#03849C" />
                      </Svg>
                    </Text> 
                    : 
                    null
                  }
                  <Text style={selectUser === 2 ? 
                    [[Styles.fontBlack14,Styles.fontBook14, Styles.ml10]] 
                    :
                    [[ Styles.fontBook14, Styles.ml10]]}>
                    At babysitter’s
                  </Text>
                  
                </TouchableOpacity>
              </View>
            </View>

            <View style={Styles.mb40}>
              <Text style={[Styles.fontMedium16, Styles.mb10]}>Summary</Text>
              <View style={Styles.boxShadow}>
                <View style={Styles.flexBetween}>
                  <Text style={[Styles.fontBlack16,Styles.fontBook16]}>Total hours</Text>
                  <Text style={[Styles.fontBlack18,Styles.fontMedium16]}>{PriceTotalHRS} hr</Text>
                </View>
                <View style={Styles.flexBetween}>
                  <Text style={[Styles.fontBlack16,Styles.fontBook16]}>Rate/hour</Text>
                  <Text style={[Styles.fontGreen14, Styles.fontMedium16]}>${price}</Text>
                </View>
                <TextInput 
                  placeholder='Got another promo code? add it here' 
                  style={{ borderWidth: 2, borderColor: '#D8DADB', borderStyle: 'dashed', borderRadius: 15, textAlign: 'center', marginVertical: 15 }} 
                  value={PromoCode}
                  onChangeText={text => setPromoCode(text)}
                  maxLength={8}
                />
                <View style={Styles.flexBetween}>
                  <Text style={[Styles.fontBlack18, Styles.fontMedium18]}>Total Amount</Text>
                  <Text style={[Styles.fontGreen24, Styles.fontMedium24]}>${TotalPrice}</Text>
                </View>
              </View>
            </View>

          </View>

          <TouchableOpacity style={Styles.btnPrimary} onPress={UserBookingAPI}>
            <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.Payment}</Text>
          </TouchableOpacity>
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
              <Text style={{fontFamily: 'GothamRounded-Book', fontWeight: '400', fontSize: 18, lineHeight: 25}}>{Strings.AppointmentBook}</Text>
            </View>
          </View>
      </SuccessfullyMsg>
    </>
  );
}



export default UserBookingDetails;


