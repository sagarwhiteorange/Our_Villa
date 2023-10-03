import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SectionList, FlatList } from 'react-native';
import Styles from '../../Styles/Styles';
import Strings from '../../Constant/Strings';
import Images from '../../Constant/Images';
import AppBg from '../../Common/AppBg';
import { BookingUpComing, NextAppointments } from '../../Api/Method';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {

  const [UserAppt, setUserAppt] = useState<any>([])
  const [UserUpcoming, setUserUpcoming] = useState<any>([])
  const [HomeCareID, setHomeCareID] = useState<any>('')

  const GetHomeCareID = async() => {
    const homecare_id = await AsyncStorage.getItem('homecare_id')
    setHomeCareID(homecare_id)
    console.log('GetCareID ======================>', homecare_id)    
  }

  useEffect(() => {
    GetHomeCareID
  }, [])

  const GetUpcomingAppointment = async() => {

    const params = {
      homecare_id: HomeCareID
    }

    const response = await BookingUpComing(params)
    if(response?.data?.ResponseData){
      const responseMap = response?.data?.ResponseData.map((item: any) => item)
      setUserUpcoming(responseMap)
    }
  }

  useEffect(() => {
    GetUpcomingAppointment()
  }, [])

  const GetNextAppointment = async() => {

    const params = {
      homecare_id: HomeCareID
    }

    const response = await NextAppointments(params)
    if(response?.data?.ResponseData){
      const responseMap = response?.data?.ResponseData.map((item: any) => item)
      setUserAppt(responseMap)
    }
  }

  useEffect(() => {
    GetNextAppointment()
  }, [])

  return (
    <>
      <AppBg />
        <View style={Styles.headerBox}>
          <View>
              <Text style={[Styles.fontBlack18, Styles.fontMedium18]}>Hey, {Strings.UserName}</Text>
              <View style={Styles.flexRow}>
                  <Text style={[Styles.fontBlack14, Styles.fontBook14]}>{Strings.Morning}</Text>
                  <Image source={Images.morning} style={{width: 16, height: 16}}/>
              </View>
          </View>
          <TouchableOpacity>
              <Image source={Images.alert} style={Styles.searchIcon}/>
          </TouchableOpacity>
        </View>

        <View style={Styles.marginHorizontal15}>
          <SectionList
            ListHeaderComponent={() => <UpcomingBooking UpComingList={UserUpcoming}/>}
            sections={SECTIONS}
            ListFooterComponent={() => <BookAppointmentsData userApptData={UserAppt} />}  
            renderSectionHeader={({ section }) => (
              <>
                <Text style={[Styles.fontBlack18,Styles.fontMedium18, Styles.marginVertical10]}>{section.title}</Text>
                {section.horizontal ? (
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({ item }) => <ListItem item={item} />}
                  />
                ) : null}
              </>
            )}          
            renderItem={({ item, section }) => {
              if (section.horizontal) {
                return null;
              }
              return <ListItem item={item} />;
            }}
          />
        </View>
    </>
  );
}

const SECTIONS = [
  {
    title: 'Recently shown your profile',
    horizontal: true,
    data: [
      { key: '1', name: 'Cooper', profilePic: Images.Cooper },
      { key: '2', name: 'Aspen', profilePic: Images.Aspen },
      { key: '3', name: 'Livia', profilePic: Images.Livia },
      { key: '4', name: 'Corey', profilePic: Images.Corey },
      { key: '5', name: 'Nelson', profilePic: Images.Nelson },
    ],
  },
];

const ListItem = ({ item }: { item: any }) => {
  return (
    <View style={[Styles.marginVertical10, Styles.boxShadow, Styles.borderRadius0]}>
      <View style={{ backgroundColor: '#FFF' }}>
        <Image source={item.profilePic} resizeMode="cover" style={Styles.recentPic} />
        <Text style={[Styles.fontMedium14, Styles.textCenter, Styles.fontMedium14]}>{item.name}</Text>
      </View>
    </View>
  );
};


type UpComingListItem = {
  id_proof: string;
  users: {
    fullname: string;
  };
  start_date: string;
  total_hours: string;
};

const UpcomingBooking = ({UpComingList} : {UpComingList: UpComingListItem[]}) => {
  return(
    <View>
      <Text style={[Styles.fontBlack18,Styles.fontMedium18, Styles.mt30]}>{Strings.UpcomingBooking}</Text>
      <FlatList 
        data={UpComingList}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View key={index} >
            <View style={Styles.offerCart}>
              <View style={[Styles.alignStart, Styles.flexRow, Styles.justifyStart]}>
                <View>
                  {
                    item?.users?.profile_pic ? 
                    <Image source={{uri: item?.users?.profile_pic}} style={Styles.profile} />
                    :
                    <Image source={Images.avatar} style={Styles.profile} />
                  }
                </View>
                <View>
                  <Text style={[Styles.fontBlack18, Styles.fontMedium18]}>{item?.users?.fullname}</Text>
                  <View style={[Styles.alignCenter, Styles.marginVertical10]}>
                    <Image source={Images.address} style={[Styles.BookingIcon, Styles.h25]} />
                    <Text style={[Styles.fontBook14, Styles.MaxWidth180]}>{item?.users?.address}</Text>
                  </View>
                </View>
              </View>
              <View style={Styles.VerticalLine}></View>
              <View style={Styles.flexBetween}>
                <View style={Styles.ItemCenter}>
                  <Image source={Images.clock} style={Styles.BookingIcon} />
                  <Text style={[Styles.fontBlack14, Styles.fontBook14]}>2 {Strings.Day}</Text>
                </View>
                <View style={Styles.ItemCenter}>
                  <Image source={Images.children} style={Styles.BookingIcon} />
                  <Text style={[Styles.fontBlack14, Styles.fontBook14]}>2 {Strings.Children}</Text>
                </View>
                <View style={Styles.ItemCenter}>
                  <Image source={Images.home} style={Styles.BookingIcon} />
                  <Text style={[Styles.fontBlack14, Styles.fontBook14]}>{Strings.AtHome}</Text>
                </View>
              </View>
              <View style={Styles.flexBetween}>
                <TouchableOpacity style={Styles.btnCancel}>
                  <Text style={[Styles.textGray16, Styles.fontMedium18]}>{Strings.Cancel}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.btnAccept}>
                  <Text style={[Styles.textPrimary16, Styles.fontMedium18]}>{Strings.Accept}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}



type UserApptItem = {
  id_proof: string;
  users: {
    fullname: string;
  };
  start_date: string;
  total_hours: string;
};

const BookAppointmentsData = ({userApptData}: { userApptData: UserApptItem[] }) => {
  return(
    <View style={{marginBottom: 85}}>
      <Text style={[Styles.fontBlack18,Styles.fontMedium18, Styles.marginVertical10]}>{Strings.NextAppointments}</Text>
      <FlatList 
        data={userApptData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View key={index}>
            <TouchableOpacity>
              <View style={[Styles.marginVertical10, Styles.boxShadow]}>
                <View style={Styles.mr15}>
                  <View style={Styles.AppointmentCard}>
                    {item.profile_pic ? 
                      <Image source={{ uri: item.profile_pic }} style={Styles.profile} />
                      :
                      <Image source={Images.avatar} style={Styles.profile}/>
                    }
                    <View>
                      <Text style={[Styles.fontBlack18, Styles.fontMedium18]}>{item?.users?.fullname}</Text>
                      <View style={[Styles.alignCenter, Styles.mt15]}>
                        <View style={[Styles.alignCenter]}>
                          <Image source={Images.date} style={Styles.BookingIcon} />
                          <Text style={[ Styles.fontBook14, Styles.MaxWidth180]}>{item.start_date}</Text>
                        </View>
                        <View style={[Styles.alignCenter, Styles.ml10]}>
                          <Image source={Images.clock} style={Styles.BookingIcon} />
                          <Text style={[ Styles.fontBook14, Styles.MaxWidth180]}>{item.total_hours} hours</Text>
                        </View>
                      </View>
                    </View>
                    <Image source={Images.next} style={[Styles.BookingIcon, Styles.ml10]} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )  
}

