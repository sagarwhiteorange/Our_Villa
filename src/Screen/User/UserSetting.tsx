import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Styles from '../../Styles/Styles';
import Images from '../../Constant/Images';
import AppBg from '../../Common/AppBg';
import Strings from '../../Constant/Strings';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

enum Url {
  UserBooking = 'UserBooking',
  UserSelect = 'UserSelect',
}

const UserSetting = (props: any) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()

  const params = {
    user_type: 0
  }
  


  return (
    <View>

        <AppBg />

        <View style={[Styles.headerBox, {justifyContent: 'center'}]}>
            <Text style={Styles.headerTitle}>{Strings.Setting}</Text>
        </View>

        <View style={[Styles.marginHorizontal15]}>

          <TouchableOpacity style={[Styles.flexRow, Styles.JustifyBetween, Styles.marginVertical20]}>
            <View style={[Styles.flexRow, Styles.justifyCenter]}>
              <Image source={Images.profile} style={Styles.SettingIcon} />
              <Text style={[Styles.fontMedium15, Styles.pl10, Styles.fontBook16]}>{Strings.Profile}</Text>
            </View>
            <Image source={Images.next} style={Styles.authIconWidth} />
          </TouchableOpacity>

          <TouchableOpacity style={[Styles.flexRow, Styles.JustifyBetween, Styles.mb20]}>
            <View style={[Styles.flexRow, Styles.justifyCenter]}>
              <Image source={Images.account} style={Styles.SettingIcon} />
              <Text style={[Styles.fontMedium15, Styles.pl10, Styles.fontBook16]}>{Strings.Account}</Text>
            </View>
            <Image source={Images.next} style={Styles.authIconWidth} />
          </TouchableOpacity>

          <TouchableOpacity style={[Styles.flexRow, Styles.JustifyBetween, Styles.mb20]}>
            <View style={[Styles.flexRow, Styles.justifyCenter]}>
              <Image source={Images.customer} style={Styles.SettingIcon} />
              <Text style={[Styles.fontMedium15, Styles.pl10, Styles.fontBook16]}>{Strings.CustomerSupport}</Text>
            </View>
            <Image source={Images.next} style={Styles.authIconWidth} />
          </TouchableOpacity>

          <TouchableOpacity style={[Styles.flexRow, Styles.JustifyBetween, Styles.mb20]}>
            <View style={[Styles.flexRow, Styles.justifyCenter]}>
              <Image source={Images.upgrade_premium} style={Styles.SettingIcon} />
              <Text style={[Styles.fontMedium15, Styles.pl10, Styles.fontBook16]}>{Strings.UpgradePremium}</Text>
            </View>
            <Image source={Images.next} style={Styles.authIconWidth} />
          </TouchableOpacity>

          <TouchableOpacity style={[Styles.flexRow, Styles.JustifyBetween, Styles.mb20]}>
            <View style={[Styles.flexRow, Styles.justifyCenter]}>
              <Image source={Images.terms_conditions} style={Styles.SettingIcon} />
              <Text style={[Styles.fontMedium15, Styles.pl10, Styles.fontBook16]}>{Strings.TermsConditions}</Text>
            </View>
            <Image source={Images.next} style={Styles.authIconWidth} />
          </TouchableOpacity>

          <TouchableOpacity style={[Styles.flexRow, Styles.JustifyBetween, Styles.mb20]}>
            <View style={[Styles.flexRow, Styles.justifyCenter]}>
              <Image source={Images.privacy_policy} style={Styles.SettingIcon} />
              <Text style={[Styles.fontMedium15, Styles.pl10, Styles.fontBook16]}>{Strings.PrivacyPolicy}</Text>
            </View>
            <Image source={Images.next} style={Styles.authIconWidth} />
          </TouchableOpacity>

          <TouchableOpacity style={Styles.btnPrimary} onPress={() => navigation.navigate('UserBooking')}>
            {params ? 
              <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.BecomeHomeCare}</Text> 
              : 
              <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.BecomeUser}</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('UserSelect')}>
            <Text style={[Styles.fontMedium18, Styles.textRed, Styles.textCenter, 
              {textDecorationColor: '#EB5757', textDecorationLine: 'underline', textDecorationStyle: 'dashed',}]}>
              {Strings.LogOut}
            </Text>
          </TouchableOpacity>
          
        </View>
    </View>
  );
}


export default UserSetting;
