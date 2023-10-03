import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import SuccessfullyMsg from '../../Common/SuccessfullyMsg';
import Images from '../../Constant/Images';
import Styles from '../../Styles/Styles';
import Strings from '../../Constant/Strings';
import {View, TouchableOpacity, Text, Image} from 'react-native'

const HomeCateCertn = ({ route, navigation }: { route: any, navigation: any }) => {
  const [certnUri, setCertnUri] = useState<any>('');
  const [visible, setVisible] = useState(false)

  const getTokenApi = async () => {
    try {
      const value = await AsyncStorage.getItem('Certn');
      setCertnUri(value);
    } catch (error) {
      console.log('error Certn Url not Found', error);
      
    }
  };

  useEffect(() => {
    getTokenApi();
  }, []);

  const closeModal = () => {
    setVisible(false)
    navigation.navigate('HomeCareSignIn') 
  }


  return (
    <>
      <WebView
        source={{ uri: certnUri }}
        onNavigationStateChange={(navState) => {
          console.log('navState ============', navState.url);
          if(navState.url === 'https://demo-app.certn.co/welcome/summary'){
            setVisible(true)
            setTimeout(() => {
              navigation.navigate('HomeCareSignIn');
            }, 5000)
          } else{
            console.log('error navigATION');            
          }
          
        }}
        startInLoadingState={true}
      />

      <SuccessfullyMsg visible={visible}>
        <View style={{position: 'relative'}}>
          <TouchableOpacity style={{position: 'absolute', right: -35, top: -15}} onPress={closeModal}>
            <Image source={Images.fill_delete} style={{width: 38, height: 38}}/>
          </TouchableOpacity>
          <Image source={Images.alert_bg} style={{width: '100%', height: 132}}/>
          <View style={{alignItems: 'center'}}>
            <Image source={Images.alert_done} style={Styles.recentPic}/>
            <Text style={[Styles.fontBlackMedium24, Styles.marginVertical20, Styles.fontMedium24]}>Congratulations!</Text>
            <Text style={{fontFamily: 'GothamRounded-Book', fontWeight: '400', fontSize: 18, lineHeight: 25}}>{Strings.RegisterMsg}</Text>
          </View>
        </View>
      </SuccessfullyMsg>
    </>
  )
};

export default HomeCateCertn;

