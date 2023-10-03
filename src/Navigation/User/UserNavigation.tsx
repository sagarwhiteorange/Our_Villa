import React from "react";
import UserSlide from "../../Screen/User/UserSlide";
import UserSignIn from "../../Screen/User/UserSignIn";
import UserSignUp from "../../Screen/User/UserSignUp";
import UserNewPassword from "../../Screen/User/UserNewPassword";
import UserOTP from "../../Screen/User/UserOTP";
import UserSetting from "../../Screen/User/UserSetting";
import UserBooking from "../../Screen/User/UserBooking";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from "react-native";
import Images from "../../Constant/Images";
import Category from "../../Screen/User/Category";
import EmptyCategory from "../../Screen/User/EmptyCategory";
import ViewCategory from "../../Screen/User/ViewCategory";
import AddCategory from "../../Screen/User/AddCategory";
import UserSetLocation from "../../Screen/User/UserSetLocation";
import UserProfile from "../../Screen/User/UserProfile";
import UserBookingDetails from "../../Screen/User/UserBookingDetails";
import UserPayment from "../../Screen/User/UserPayment";
import Styles from "../../Styles/Styles";
import UserHome from "../../Screen/User/UserHome";
import UserFilter from "../../Screen/User/UserFilter";

import UserForgotPassword from "../../Screen/User/UserForgotpassword";

const Tab = createBottomTabNavigator();


export default function UserNavigation(Stack: any) {
  return(
      <>
        <Stack.Screen name="UserSlide" component={UserSlide} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="UserSignIn" component={UserSignIn} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="UserSignUp" component={UserSignUp} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="UserForgotPassword" component={UserForgotPassword} options={{headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="UserNewPassword" component={UserNewPassword} options={{headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="UserOTP" component={UserOTP} options={{headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="Category" component={Category} options={{headerBackVisible: false,headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="EmptyCategory" component={EmptyCategory} options={{headerBackVisible: false,headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="AddCategory" component={AddCategory} options={{headerBackVisible: false,headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="ViewCategory" component={ViewCategory} options={{headerBackVisible: false,headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{headerBackVisible: false,headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="UserBookingDetails" component={UserBookingDetails} options={{headerBackVisible: false,headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="UserPayment" component={UserPayment} options={{headerBackVisible: false,headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="UserFilter" component={UserFilter} options={{headerBackVisible: false,headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="UserSetLocation" component={UserSetLocation} options={{headerBackVisible: false,headerTransparent: true, headerTitle: ''}}></Stack.Screen>
        <Stack.Screen name="UserHome" options={{headerShown: false, headerTransparent: true, headerTitle: ''}}>
          {() => (
            <Tab.Navigator screenOptions={{
              tabBarActiveTintColor: '#03849C',
              tabBarInactiveTintColor: '#818D8E',
              tabBarStyle: {...Styles.bottomBar}, 
              tabBarLabelStyle: {...Styles.tabBarFontGray12},              
            }}>

              <Tab.Screen name="Home" component={UserHome} 
                options={{
                  headerTransparent: true, 
                  headerTitle: '', 
                  tabBarIcon: ({focused}) => (focused ? <Image source={Images.Active_Home} style={{width: 20, height: 20}}/> : <Image source={Images.home} style={{width: 20, height: 20}}/>)
                }}></Tab.Screen>
           
              <Tab.Screen name="Booking" component={UserBooking} 
                options={{
                  headerTransparent: true, 
                  headerTitle: '', 
                  tabBarIcon: ({focused}) => (focused ? <Image source={Images.Active_Booking} style={{width: 20, height: 20}}/> : <Image source={Images.booking} style={{width: 20, height: 20}}/>)
                }}></Tab.Screen>

              <Tab.Screen name="Setting" component={UserSetting} 
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
