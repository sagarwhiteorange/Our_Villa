import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Styles from '../../Styles/Styles';
import Images from '../../Constant/Images';
import AppBg from '../../Common/AppBg';
import Strings from '../../Constant/Strings';
import * as Animatable from 'react-native-animatable';

const VerificationDoc = ({navigation} : {navigation: any}) => {

  const onPress = () => {
    navigation.navigate('HomeCareHome')
  }

  const handleBack = () => {
    navigation.goBack();
  }

  return (
      <View>
        <AppBg />
        <View style={Styles.headerBox}>
          <TouchableOpacity onPress={handleBack}>
            <Image source={Images.back} style={Styles.backIcon}/>
          </TouchableOpacity>
          <Text style={Styles.headerTitle}>{Strings.VerificationDocuments}</Text>
          <Text></Text>
        </View>
        <View style={Styles.marginHorizontal15}>
        <View style={[Styles.mt20, Styles.marginVertical10]}>
          <Text style={Styles.fontMedium16}>{Strings.PendingDocuments}</Text>
          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.bgWhiteBorder12}>
            <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.m15, Styles.paddingVertical5]}>
              <View style={[Styles.flexRow, Styles.justifyCenter]}>
                <Image source={Images.PendingDoc} style={Styles.authIconWidth}/>
                <Text style={[Styles.fontBlack14, Styles.fontBook14, Styles.pl10]}>{Strings.DrivingLicenses}</Text>
              </View>
              <Image source={Images.next} style={Styles.authIconWidth}/>
            </View>
            <View style={Styles.VerificationDocBox}></View>
            <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.m15, Styles.paddingVertical5]}>
              <View style={[Styles.flexRow, Styles.justifyCenter]}>
                <Image source={Images.PendingDoc} style={Styles.authIconWidth}/>
                <Text style={[Styles.fontBlack14, Styles.fontBook14, Styles.pl10]}>{Strings.ABACertificate}</Text>
              </View>
              <Image source={Images.next} style={Styles.authIconWidth}/>
            </View>
          </Animatable.View>
        </View>
        <View style={Styles.marginVertical10}>
          <Text style={Styles.fontMedium16}>{Strings.SubmittedDocuments}</Text>
          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.bgWhiteBorder12}>
            <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.m15, Styles.paddingVertical5]}>
              <View style={[Styles.flexRow, Styles.justifyCenter]}>
                <Image source={Images.SubmittedDoc} style={Styles.authIconWidth}/>
                <Text style={[Styles.fontBlack14, Styles.fontBook14, Styles.pl10]}>{Strings.ABACertificate}</Text>
              </View>
              <Image source={Images.next} style={Styles.authIconWidth}/>
            </View>
            <View style={Styles.VerificationDocBox}></View>
            <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.m15, Styles.paddingVertical5]}>
              <View style={[Styles.flexRow, Styles.justifyCenter]}>
                <Image source={Images.SubmittedDoc} style={Styles.authIconWidth}/>
                <Text style={[Styles.fontBlack14, Styles.fontBook14, Styles.pl10]}>{Strings.EarlyChildhoodEducation}</Text>
              </View>
              <Image source={Images.next} style={Styles.authIconWidth}/>
            </View>
          </Animatable.View>
        </View>
        <View style={Styles.marginVertical10}>
          <Text style={Styles.fontMedium16}>{Strings.ApprovedDocuments}</Text>
          <Animatable.View duration={3000} animation="slideInLeft" style={Styles.bgWhiteBorder12}>
            <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.m15, Styles.paddingVertical5]}>
              <View style={[Styles.flexRow, Styles.justifyCenter]}>
                <Image source={Images.ApprovedDoc} style={Styles.authIconWidth}/>
                <Text style={[Styles.fontBlack14, Styles.fontBook14, Styles.pl10]}>{Strings.ProfilePhoto}</Text>
              </View>
              <Image source={Images.next} style={Styles.authIconWidth}/>
            </View>
            <View style={Styles.VerificationDocBox}></View>
            <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.m15, Styles.paddingVertical5]}>
              <View style={[Styles.flexRow, Styles.justifyCenter]}>
                <Image source={Images.ApprovedDoc} style={Styles.authIconWidth}/>
                <Text style={[Styles.fontBlack14, Styles.fontBook14, Styles.pl10]}>{Strings.IDProof}</Text>
              </View>
              <Image source={Images.next} style={Styles.authIconWidth}/>
            </View>
          </Animatable.View>
        </View>
        <TouchableOpacity onPress={onPress} style={[Styles.btnBlue, Styles.mt48]}>
          <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.GetStart}</Text>
        </TouchableOpacity>
      </View>
      
      </View>
  );
}

export default VerificationDoc;
