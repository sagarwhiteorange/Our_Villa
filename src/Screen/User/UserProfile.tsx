import React, {useEffect, useState} from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, FlatList } from 'react-native';
import AppBg from '../../Common/AppBg';
import Styles from '../../Styles/Styles';
import Strings from '../../Constant/Strings';
import Images from '../../Constant/Images';
import { HomeCarePersonDetails } from '../../Api/Method';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useIsFocused, useNavigation } from '@react-navigation/native';

enum Url {
  UserBookingDetails = 'UserBookingDetails',
}


const UserProfile = (props: any) => {

  const [UserProfile, setUserProfile] = useState<any>('')
  const [SkillList, setSkillList] = useState<any>('')
  const [DocumentList, setDocumentList] = useState<any>('')
  const [token, setToken] = useState<string | null>(null)
  const [UserID, setUserID] = useState(props?.route?.params?.id || '')
  const [Slug, setSlug] = useState(props?.route?.params?.slug || '')
  const [HomeCareID, setHomeCareID] = useState('')

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()
  const isFocused = useIsFocused() 

  const handleBack = () => {
    navigation.goBack();
  }



  const GetUserProfile = async() => {

   const params = {
    Authorization: token,
   }

    try {
      const response = await HomeCarePersonDetails(params, UserID, Slug)
      setHomeCareID(response?.data?.ResponseData?.HomeCarePerson?.id);
      
      setUserProfile(response?.data?.ResponseData?.HomeCarePerson)
      setSkillList(response?.data?.ResponseData?.HomeCarePerson?.skillsList)
      setDocumentList(response?.data?.ResponseData?.HomeCarePerson?.home_care_person_document)      
    } catch (error) {
      console.log('Get User Profile error ===========>', error);      
    }
  }

  const getTokenApi = async() => {
    try {
      const value = await AsyncStorage.getItem('token')
    setToken(value)
    GetUserProfile()
    } catch (error) {
      console.log('error', error);      
    }
  }

  useEffect(()=>{
    getTokenApi()
  },[isFocused])

  useEffect(() => {
    setUserID(props?.route?.params?.id || '')
    setSlug(props?.route?.params?.slug || '')
  }, [props?.route?.params?.id, props?.route?.params?.slug])




  return (
    <>
        <AppBg />

        <View style={Styles.headerBox}>
            <TouchableOpacity onPress={handleBack}>
              <Image source={Images.back} style={Styles.backIcon}/>
            </TouchableOpacity>
            <Text style={Styles.headerTitle}>{Strings.Profile}</Text>
            <Text></Text>
        </View>

        <ScrollView>
          <View style={[Styles.marginHorizontal15, Styles.mt20]}>
            <View style={[Styles.flexStart, Styles.mb20]}>
              {UserProfile ?
              <Image source={{uri: UserProfile?.profile_pic}} style={Styles.loginBrand} />
              :
              <Image source={Images.avatar} style={Styles.loginBrand} />  
              }
              {/* <Image source={{uri: UserProfile?.profile_pic}} style={Styles.loginBrand} /> */}
              <View style={[Styles.marginHorizontal15, Styles.MaxWidth280]}>
                <View style={Styles.flexBetween}>
                  <View>
                    <Text style={Styles.fontMedium16}>{UserProfile?.fullname}</Text>
                    <Text style={[Styles.fontGray16, Styles.fontBook16]}>{UserProfile?.email}</Text>
                    <View style={[Styles.alignCenter, Styles.mt5]}>
                      <Text style={[Styles.fontGreen24, Styles.fontMedium24]}>${UserProfile?.price}</Text>
                      <Text style={[Styles.fontGreen14, Styles.fontMedium14]}>/ hour</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={[Styles.flexBetween, Styles.mb20]}>
              <View style={[Styles.boxShadow, Styles.alignItemCenter, { paddingHorizontal: 30 }]}>
                <Text style={Styles.fontMedium16}>{UserProfile?.experience}+ years</Text>
                <Text style={[ Styles.fontBook14]}>Experience</Text>
              </View>
              <View style={[Styles.boxShadow, Styles.alignItemCenter, { paddingHorizontal: 30 }]}>
                <Text style={Styles.fontMedium16}>150</Text>
                <Text style={[ Styles.fontBook14]}>Reviews</Text>
              </View>
              <View style={[Styles.boxShadow, Styles.alignItemCenter, { paddingHorizontal: 30 }]}>
                <Text style={Styles.fontMedium16}>512</Text>
                <Text style={[ Styles.fontBook14]}>Clients</Text>
              </View>
            </View>

            <View>
              <Text style={Styles.fontMedium16}>{Strings.About}</Text>
              <Text style={[Styles.fontGray15, Styles.mt10, Styles.fontBook14]}>{UserProfile?.about}</Text>
            </View>

            <View>
              <View style={Styles.marginVertical20}>
                <Text style={Styles.fontMedium16}>{Strings.Skills}</Text>
              </View>
                <FlatList 
                  data={SkillList}
                  horizontal={true}
                  renderItem={({item, index}) => {
                    const backgroundColors = ['#EDDDDE','#DDE4F0', '#F0ECE2', '#EBDCE6','#ECE4F1', '#E2E9DD']
                    const colors = ['#B11515','#195EC6','#D6A938','#9F0B6D','#A656D7','#488E10']
                    const colorIndex = index % 6
                    const backgroundColor = backgroundColors[colorIndex]
                    const color = colors[colorIndex]
                    return(
                      <View style={[Styles.alignCenter, { flexWrap: 'wrap', paddingRight: 15 }]}>
                        <View style={[{ backgroundColor, borderRadius: 8, }]}>
                          <Text style={[Styles.fontMedium14, Styles.fontDanger, {color}]}>{item.name}</Text>
                        </View>
                    </View>                                      
                  )}
                }
                />
            </View>

            <View>

              <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.marginVertical20]}>
                <Text style={Styles.fontMedium16}>{Strings.Certificates}</Text>
                <Text style={[ Styles.fontBook14]}>{Strings.ViewAll}</Text>
              </View>

              <View style={[Styles.boxShadow, Styles.flexBetween]}>
                  <FlatList 
                    data={DocumentList}
                    keyExtractor={({item}) => item}
                    renderItem={({item}) => (
                      <View style={[Styles.alignCenter, Styles.JustifyBetween, Styles.paddingVertical10]}>
                        <Text style={[Styles.fontMedium16,Styles.pl10]}>{item.file_type}.{item.document_type}</Text>
                        <Image source={Images.download} style={[Styles.w16, Styles.h16]} />
                      </View>
                    )}
                  />
              </View>


            </View>

            <View>

              <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.marginVertical20]}>
                <Text style={Styles.fontMedium16}>{Strings.Feedback}</Text>
                <Text style={[ Styles.fontBook14]}>{Strings.ViewAll}</Text>
              </View>

              <View style={[Styles.boxShadow, Styles.flexBetween, Styles.alignStart, Styles.mb20]}>

                <Image source={Images.client_1} style={Styles.SettingIcon} />

                <View style={[Styles.marginHorizontal15]}>
                  <View style={Styles.flexBetween}>
                    <View>
                      <Text style={Styles.fontMedium16}>{Strings.DavisCarder}</Text>
                      <View style={[Styles.alignCenter, Styles.mt5]}>
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.unFill} style={Styles.star} />
                      </View>
                    </View>
                    <Text style={[ Styles.fontBook14, Styles.mr30]}>5 {Strings.DaysAgo}</Text>
                  </View>

                  <Text style={[ Styles.fontBook14, Styles.mt15, Styles.mr30]}>{Strings.DavisCarderAbout}</Text>
                
                </View>

              </View>

              <View style={[Styles.boxShadow, Styles.flexBetween, Styles.alignStart, Styles.mb20]}>

                <Image source={Images.client_2} style={Styles.SettingIcon} />

                <View style={[Styles.marginHorizontal15]}>
                  <View style={Styles.flexBetween}>
                    <View>
                      <Text style={Styles.fontMedium16}>{Strings.JohnsonGreen}</Text>
                      <View style={[Styles.alignCenter, Styles.mt5]}>
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.unFill} style={Styles.star} />
                      </View>
                    </View>
                    <Text style={[ Styles.mr30, Styles.fontBook14]}>5 {Strings.DaysAgo}</Text>
                  </View>

                  <Text style={[ Styles.mt15, Styles.mr30, Styles.fontBook14]}>
                    {Strings.JohnsonGreenAbout}
                  </Text>
                
                </View>

              </View>

              <View style={[Styles.boxShadow, Styles.flexBetween, Styles.alignStart, Styles.mb20]}>

                <Image source={Images.client_3} style={Styles.SettingIcon} />

                <View style={[Styles.marginHorizontal15]}>
                  <View style={Styles.flexBetween}>
                    <View>
                      <Text style={Styles.fontMedium16}>{Strings.SmithFlores}</Text>
                      <View style={[Styles.alignCenter, Styles.mt5]}>
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.fill} style={Styles.star} />
                        <Image source={Images.unFill} style={Styles.star} />
                      </View>
                    </View>
                    <Text style={[ Styles.mr30, Styles.fontBook14]}>5 {Strings.DaysAgo}</Text>
                  </View>

                  <Text style={[ Styles.mt15, Styles.mr30, Styles.fontBook14]}>
                    {Strings.SmithFloresAbout}
                  </Text>
                
                </View>
              </View>

            </View>
          </View>

          <TouchableOpacity style={Styles.btnPrimary} onPress={() => navigation.navigate('UserBookingDetails', {price: UserProfile?.price, HomeCareID: HomeCareID})}>
            <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.BookNow}</Text>
          </TouchableOpacity>
        </ScrollView>

    </>
  );
}



export default UserProfile;


