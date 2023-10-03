import React from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppBg from '../../Common/AppBg';
import Styles from '../../Styles/Styles';
import Strings from '../../Constant/Strings';
import Images from '../../Constant/Images';
import * as Animatable from 'react-native-animatable';


const UserPayment = ({ navigation }: { navigation: any }) => {

  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <>
        <AppBg />

        <View style={Styles.headerBox}>
          <TouchableOpacity onPress={handleBack}>
            <Image source={Images.back} style={Styles.backIcon}/>
          </TouchableOpacity>
          <Text style={Styles.headerTitle}>{Strings.Payment}</Text>
          <Text></Text>
        </View>

        <ScrollView>

          <View style={[Styles.marginHorizontal15, Styles.mt20]}>
            <View>
              <Text style={[Styles.fontBlack18, Styles.fontMedium18]}>Total Amount</Text>
              <Animatable.Text duration={3000} animation="slideInLeft" style={[Styles.fontGreen24,Styles.fontMedium24, Styles.mt20]}>$96</Animatable.Text>
            </View>

            <View>
              <Text style={[Styles.fontBlack18, Styles.marginVertical20, Styles.fontMedium18]}>Payment method</Text>
              <View style={Styles.flexBetween}>

                <Animatable.View duration={3000} animation="slideInLeft" style={{ width: '47%' }}>
                  <TouchableOpacity style={[Styles.boxShadow, Styles.flexRow]}>
                    <Image source={Images.apple} style={{ width: 18, height: 24, marginRight: 10 }} />
                    <Text style={[Styles.fontBlack16, Styles.fontBook16]}>Pay</Text>
                  </TouchableOpacity>
                </Animatable.View>

                <Animatable.View duration={3000} animation="slideInRight" style={{ width: '47%' }}>
                  <TouchableOpacity style={[Styles.boxShadow, Styles.flexRow]}>
                    <Text style={[Styles.fontBlack16, Styles.fontBook16]}>Stripe</Text>
                  </TouchableOpacity>
                </Animatable.View>
              </View>

              <Text style={[Styles.fontBlack16, Styles.marginVertical20, Styles.textCenter]}>Or pay with card</Text>
            
            </View>

            <View>
              <Text style={[Styles.fontBlack18, Styles.mb10, Styles.fontMedium18]}>Card information</Text>
              <Animatable.View duration={3000} animation="slideInLeft" style={Styles.mb10}>
                <Text style={[Styles.fontBlack16, Styles.fontBook16]}>Holder name</Text>
                <View style={Styles.formControl}>
                  <TextInput placeholder='John Smith' keyboardType='default' style={[ Styles.fontBook14, Styles.CustomWidth, Styles.pl10]} />
                </View>
              </Animatable.View>

              <Animatable.View duration={3000} animation="slideInLeft" style={Styles.mb10}>
                <Text style={[Styles.fontBlack16, Styles.fontBook16]}>Card number</Text>
                <View style={Styles.formControl}>
                  <TextInput placeholder='**** **** **** 1245' keyboardType='decimal-pad' style={[ Styles.fontBook14, Styles.CustomWidth, Styles.pl10]} />
                  <Image source={Images.MasterCard} style={Styles.authIconWidth} />
                </View>
              </Animatable.View>

              <View style={Styles.mb40}>
                <View style={Styles.flexBetween}>
                  <Animatable.View duration={3000} animation="slideInLeft" style={{ width: '47%' }}>
                    <Text style={[Styles.fontBlack16, Styles.fontBook16]}>Expiry date</Text>
                    <View style={[Styles.formControl, Styles.flexBetween]}>
                      <TextInput placeholder='10/25' keyboardType='decimal-pad' style={[ Styles.fontBook14, Styles.pl10]} />
                      <Image source={Images.calendar_gray} style={Styles.authIconWidth} />
                    </View>
                  </Animatable.View>
                  
                  <Animatable.View duration={3000} animation="slideInRight" style={{ width: '47%' }}>
                    <Text style={[Styles.fontBlack16, Styles.fontBook16]}>CVV</Text>
                    <View style={Styles.formControl}>
                      <TextInput placeholder='624' keyboardType='decimal-pad' style={[ Styles.fontBook14, Styles.pl10]} />
                    </View>
                  </Animatable.View>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={Styles.btnPrimary} onPress={() => navigation.navigate('UserBooking')}>
            <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.ConfirmPayment}</Text>
          </TouchableOpacity>
        </ScrollView>
    </>
  );
}



export default UserPayment;


