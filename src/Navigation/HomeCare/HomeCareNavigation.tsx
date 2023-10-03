import React from "react";
import VerificationDoc from "../../Screen/HomeCare/VerificationDoc";
import HomeCareSignUp from "../../Screen/HomeCare/HomeCareSignUp";
import HomeCareSignIn from "../../Screen/HomeCare/HomeCareSignIn";
import HomeCareSlide from "../../Screen/HomeCare/HomeCareSlide";
import HomeCareSetting from "../../Screen/HomeCare/HomeCareSetting";
import HomeCareBooking from "../../Screen/HomeCare/HomeCareBooking";
import HomeCareHome from "../../Screen/HomeCare/HomeCareHome";
import HomeCateCertn from "../../Screen/HomeCare/HomeCateCertn";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import Images from "../../Constant/Images";
import Styles from "../../Styles/Styles";
import HomeCareForgotPassword from "../../Screen/HomeCare/HomeCareForgotPassword";
import HomeCareNewPassword from "../../Screen/HomeCare/HomeCareNewPassword";
import HomeCareOTP from "../../Screen/HomeCare/HomeCareOTP";
import HomeCareSetLocation from "../../Screen/HomeCare/HomeCareSetLocation";

const Tab = createBottomTabNavigator();

export default function HomeCareNavigation(Stack:any) {
  return(
      <>
        <Stack.Screen name="HomeCareSlide" component={HomeCareSlide} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="HomeCareSignIn" component={HomeCareSignIn} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="HomeCareSignUp" component={HomeCareSignUp} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="HomeCareForgotPassword" component={HomeCareForgotPassword} options={{headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="HomeCareNewPassword" component={HomeCareNewPassword} options={{headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="HomeCareOTP" component={HomeCareOTP} options={{headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="HomeCateCertn" component={HomeCateCertn} options={{headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="HomeCareSetLocation" component={HomeCareSetLocation} options={{headerBackVisible: false, headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="VerificationDoc" component={VerificationDoc} options={{headerBackVisible: false,headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="HomeCareHome" options={{headerShown: false}}>
          {() => (
            <Tab.Navigator screenOptions={{
              tabBarActiveTintColor: '#03849C',
              tabBarInactiveTintColor: '#818D8E',
              tabBarStyle: {...Styles.bottomBar}, 
              tabBarLabelStyle: {...[Styles.tabBarFontGray12, Styles.fontMedium12]},              
            }}>
           
              <Tab.Screen name="Home" component={HomeCareHome} 
                options={{
                  headerTransparent: true, 
                  headerTitle: '', 
                  tabBarIcon: ({focused}) => (focused ? <Image source={Images.Active_Home} style={{width: 20, height: 20}}/> : <Image source={Images.home} style={{width: 20, height: 20}}/>)
                }}></Tab.Screen>

              <Tab.Screen name="Booking" component={HomeCareBooking} 
                options={{
                  headerTransparent: true, 
                  headerTitle: '', 
                  tabBarIcon: ({focused}) => (focused ? <Image source={Images.Active_Booking} style={{width: 20, height: 20}}/> : <Image source={Images.booking} style={{width: 20, height: 20}}/>)
                }}></Tab.Screen>

              <Tab.Screen name="Setting" component={HomeCareSetting} 
                options={{
                  headerTransparent: true, 
                  headerTitle: '', 
                  tabBarIcon: ({focused}) => (focused ? <Image source={Images.Active_Setting} style={{width: 20, height: 20}}/> : <Image source={Images.setting} style={{width: 20, height: 20}}/>)
                }}></Tab.Screen>
                
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </>
  )
}



