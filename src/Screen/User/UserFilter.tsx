import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Strings from '../../Constant/Strings';
import Styles from '../../Styles/Styles';
import AppBg from '../../Common/AppBg';
import Images from '../../Constant/Images';
import { CheckBox } from '@rneui/base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const UserFilter = ({ navigation }: { navigation: any }) => {

  const [checked1, setChecked1] = useState(true);
  const toggleCheckbox1 = () => setChecked1(!checked1);
  const [checked2, setChecked2] = useState(true);
  const toggleCheckbox2 = () => setChecked2(!checked2);
  const [checked3, setChecked3] = useState(true);
  const toggleCheckbox3 = () => setChecked3(!checked3);
  const [checked4, setChecked4] = useState(true);
  const toggleCheckbox4 = () => setChecked4(!checked4);
  const [DatePickerVisibility, setDatePickerVisibility] = useState(false)

  const FilterSave = () => {
    navigation.goBack()
  }

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
          <Text style={Styles.headerTitle}>{Strings.Filter}</Text>
          <TouchableOpacity onPress={handleBack}>
            <Text style={Styles.clear}>{Strings.ClearAll}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={[Styles.marginHorizontal15, Styles.mt20]}>
            <Text style={[Styles.fontMedium16, Styles.mb10]}>{Strings.ExperienceBabysitter}</Text>
            <View style={[Styles.boxShadow, { height: Dimensions.get('window').height / 5.7 }]}>
              <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.mt5]}>
                <Text style={Styles.fontMedium16}>Min.0 year</Text>
                <Text style={Styles.fontMedium16}>Max.30+ years</Text>
              </View>
              <View style={[Styles.width1_2, Styles.mt20, { height: 5, backgroundColor: '#EBEDED', }]}>
                <View style={[Styles.w48, { height: 5, backgroundColor: '#03849C', alignSelf: 'center', }]}>
                  <View style={{ height: 20, width: 20, backgroundColor: '#03849C', borderRadius: 20, position: 'absolute', top: -8, left: 0 }}>
                    <View style={{ height: 12, width: 12, backgroundColor: '#FFF', borderRadius: 12, position: 'absolute', top: 4, left: 4 }}>
                    </View>
                    <ImageBackground source={Images.range} style={{ width: 58, height: 35, marginTop: 25, marginLeft: -17 }}>
                      <Text style={[Styles.fontBlack12, Styles.fontBook12, { color: 'white', textAlign: 'center' }]}>1 year</Text>
                    </ImageBackground>
                  </View>
                  <View style={{ height: 20, width: 20, backgroundColor: '#03849C', borderRadius: 20, position: 'absolute', top: -8, right: 0 }}>
                    <View style={{ height: 12, width: 12, backgroundColor: '#FFF', borderRadius: 12, position: 'absolute', top: 4, left: 4 }}>
                    </View>
                    <ImageBackground source={Images.range} style={{ width: 58, height: 35, marginTop: 25, marginLeft: -17 }}>
                      <Text style={[Styles.fontBlack12, Styles.fontBook12, { color: 'white', textAlign: 'center' }]}>3 year</Text>
                    </ImageBackground>
                  </View>
                </View>
              </View>
            </View>
            <Text style={[Styles.fontMedium16, Styles.mt20, Styles.mt20]}>{Strings.VerificationDocuments}</Text>
            <View style={Styles.boxShadow}>
              <View style={{ marginLeft: -20 }}>
                <CheckBox
                  checked={!checked1}
                  onPress={toggleCheckbox1}
                  checkedIcon={<Image source={Images.checked} style={Styles.checkbox} />}
                  uncheckedIcon={<Image source={Images.unchecked} style={Styles.checkbox} />}
                  title='Government ID'
                />
                <CheckBox
                  checked={!checked2}
                  onPress={toggleCheckbox2}
                  checkedIcon={<Image source={Images.checked} style={Styles.checkbox} />}
                  uncheckedIcon={<Image source={Images.unchecked} style={Styles.checkbox} />}
                  title='Police verification certificate'
                />
                <CheckBox
                  checked={!checked3}
                  onPress={toggleCheckbox3}
                  checkedIcon={<Image source={Images.checked} style={Styles.checkbox} />}
                  uncheckedIcon={<Image source={Images.unchecked} style={Styles.checkbox} />}
                  title='Early childhood education certificate'
                />
                <CheckBox
                  checked={!checked4}
                  onPress={toggleCheckbox4}
                  checkedIcon={<Image source={Images.checked} style={Styles.checkbox} />}
                  uncheckedIcon={<Image source={Images.unchecked} style={Styles.checkbox} />}
                  title='ABA certificate'
                />
              </View>
            </View>

            <Text style={[Styles.fontMedium16, Styles.mt20]}>{Strings.AgeBabysitter}</Text>
            <View style={[Styles.boxShadow, Styles.mt10, { height: Dimensions.get('window').height / 5.7 }]}>

              <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.mt5]}>
                <Text style={Styles.fontMedium16}>Min.16</Text>
                <Text style={Styles.fontMedium16}>Max.60</Text>
              </View>

              <View style={[Styles.width1_2, Styles.mt20, { height: 5, backgroundColor: '#EBEDED', }]}>
                <View style={[Styles.w48, { height: 5, backgroundColor: '#03849C', alignSelf: 'center', }]}>
                  <View style={{ height: 20, width: 20, backgroundColor: '#03849C', borderRadius: 20, position: 'absolute', top: -8, left: 0 }}>
                    
                    <View style={{ height: 12, width: 12, backgroundColor: '#FFF', borderRadius: 12, position: 'absolute', top: 4, left: 4 }}>
                    </View>

                    <ImageBackground source={Images.range} style={{ width: 58, height: 35, marginTop: 25, marginLeft: -17 }}>
                      <Text style={[Styles.fontBlack12, Styles.fontBook12, { color: 'white', textAlign: 'center' }]}>20</Text>
                    </ImageBackground>
                  </View>

                  <View style={{ height: 20, width: 20, backgroundColor: '#03849C', borderRadius: 20, position: 'absolute', top: -8, right: 0 }}>
                    
                    <View style={{ height: 12, width: 12, backgroundColor: '#FFF', borderRadius: 12, position: 'absolute', top: 4, left: 4 }}>
                    </View>

                    <ImageBackground source={Images.range} style={{ width: 58, height: 35, marginTop: 25, marginLeft: -17 }}>
                      <Text style={[Styles.fontBlack12, Styles.fontBook12, { color: 'white', textAlign: 'center' }]}>35</Text>
                    </ImageBackground>
                  
                  </View>
                </View>
              </View>
            </View>

            <Text style={[Styles.fontMedium16, Styles.mt20]}>{Strings.Availability}</Text>
            <View style={Styles.flexBetween}>
              <View style={{ width: '47%' }}>
                <Text style={[Styles.fontBlack16, Styles.marginVertical10,Styles.fontBook16,]}>Start date</Text>
                <TouchableOpacity style={[Styles.boxShadow, Styles.flexRow, Styles.flexBetween]} >
                  <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>Select Date</Text>
                  <Image source={Images.calendar_gray} style={Styles.authIconWidth} />
                </TouchableOpacity>
              </View>
              <View style={{ width: '47%' }}>
                <Text style={[Styles.fontBlack16, Styles.marginVertical10, Styles.fontBook16,]}>End date</Text>
                <TouchableOpacity style={[Styles.boxShadow, Styles.flexRow, Styles.flexBetween]} >
                  <Text style={[Styles.fontBlack16, Styles.fontBook16,]}>Select Date</Text>
                  <Image source={Images.calendar_gray} style={Styles.authIconWidth} />
                </TouchableOpacity>

              </View>
            </View>

            <DateTimePickerModal
              isVisible={true}
              mode="date"
              onConfirm={(date) => {
                setDatePickerVisibility(false);
              }}
              onCancel={() => {
                setDatePickerVisibility(false);
              }}
            />

            <Text style={[[Styles.fontMedium16, Styles.mt20]]}>{Strings.MaximumRatePerHour}</Text>
            <View style={[Styles.boxShadow, Styles.mt10, { height: Dimensions.get('window').height / 5.7 }]}>

              <View style={[Styles.flexRow, Styles.JustifyBetween, Styles.mt5]}>
                <Text style={Styles.fontMedium16}>Min.$10</Text>
                <Text style={Styles.fontMedium16}>Max.$100</Text>
              </View>

              <View style={[Styles.width1_2, Styles.mt20, { height: 5, backgroundColor: '#EBEDED', }]}>
                <View style={[Styles.w48, { height: 5, backgroundColor: '#03849C', alignSelf: 'center', }]}>
                  <View style={{ height: 20, width: 20, backgroundColor: '#03849C', borderRadius: 20, position: 'absolute', top: -8, left: 0 }}>
                    <View style={{ height: 12, width: 12, backgroundColor: '#FFF', borderRadius: 12, position: 'absolute', top: 4, left: 4 }}>
                    </View>
                    <ImageBackground source={Images.range} style={{ width: 58, height: 35, marginTop: 25, marginLeft: -17 }}>
                      <Text style={[Styles.fontBlack12, Styles.fontBook12, { color: 'white', textAlign: 'center' }]}>10</Text>
                    </ImageBackground>
                  </View>

                  <View style={{ height: 20, width: 20, backgroundColor: '#03849C', borderRadius: 20, position: 'absolute', top: -8, right: 0 }}>
                    <View style={{ height: 12, width: 12, backgroundColor: '#FFF', borderRadius: 12, position: 'absolute', top: 4, left: 4 }}>
                    </View>
                    <ImageBackground source={Images.range} style={{ width: 58, height: 35, marginTop: 25, marginLeft: -17 }}>
                      <Text style={[Styles.fontBlack12, Styles.fontBook12, { color: 'white', textAlign: 'center' }]}>50</Text>
                    </ImageBackground>
                  </View>

                </View>
              </View>
            </View>

            <View style={[Styles.mb20, Styles.mt30]}>
              <TouchableOpacity onPress={FilterSave} style={Styles.btnBlue}>
                <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.Save}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({

  modelText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
});



export default UserFilter;
