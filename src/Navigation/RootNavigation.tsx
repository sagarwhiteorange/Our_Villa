import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserNavigation from "./User/UserNavigation";
import HomeCareNavigation from "./HomeCare/HomeCareNavigation";
import Splash from "../Screen/Splash";
import UserSelect from "../Screen/UserSelect";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {

  
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Category">
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="UserSelect" component={UserSelect} options={{headerShown: false}}></Stack.Screen>
        {UserNavigation(Stack)}
        {HomeCareNavigation(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  )
}