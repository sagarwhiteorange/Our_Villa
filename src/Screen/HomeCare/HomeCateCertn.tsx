import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';

const HomeCateCertn = ({ route, navigation }: { route: any, navigation: any }) => {
  const [certnUri, setCertnUri] = useState<any>('');

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

  const [hasNavigated, setHasNavigated] = useState(false);

  return (
    <>
      <WebView
        source={{ uri: certnUri }}
        onNavigationStateChange={(navState) => {
          if (navState.url.includes("/api") && !hasNavigated) {
            setHasNavigated(true);
            navigation.navigate('HomeCareSignIn');
          }
        }}
        startInLoadingState={true}
      />
    </>
  )
};

export default HomeCateCertn;
