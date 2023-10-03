import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SectionList, FlatList } from 'react-native';
import Styles from '../../Styles/Styles';
import Strings from '../../Constant/Strings';
import Images from '../../Constant/Images';
import AppBg from '../../Common/AppBg';
import { NextAppointments } from '../../Api/Method';

export default () => {

  const [UserAppt, setUserAppt] = useState<any>([])
  console.log('UserAppt =========>', UserAppt);

  const GetNextAppointment = async() => {

    const params = {
      homecare_id: '9'
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
            ListHeaderComponent={UpcomingBooking}
            sections={SECTIONS}
            ListFooterComponent={() => <BookAppointmentsData userApptData={UserAppt} />}            
            renderItem={({ item, index }) => (
              <View key={index}>
                <Text>Hello</Text>
              </View>
            )}
          />
        </View>

        

        <View style={Styles.marginHorizontal15}>
          <Text style={[Styles.fontBlack18,Styles.fontMedium18, Styles.marginVertical10]}>{Strings.RecentlyProfile}</Text>
        </View>

        

    </>
  );
}



const UpcomingBooking = () => {
  return(
    <View>
      <Text style={[Styles.fontBlack18,Styles.fontMedium18, Styles.marginVertical10]}>{Strings.UpcomingBooking}</Text>
    </View>
  )
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
    <View>
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
                    <Image source={{ uri: item.id_proof }} style={Styles.profile} />
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

