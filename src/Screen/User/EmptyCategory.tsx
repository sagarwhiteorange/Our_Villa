import React, {useState} from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AppBg from '../../Common/AppBg';
import Images from '../../Constant/Images';
import Strings from '../../Constant/Strings';
import Styles from '../../Styles/Styles';
import * as Animatable from 'react-native-animatable';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

enum Url {
  AddCategory = 'AddCategory',
}


const EmptyCategory = ({route} : {route: any}) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()

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
          <Text style={Styles.headerTitle}>{Strings.CategoryDetails}</Text>
          <Text></Text>
        </View>

        <View style={Styles.flexCenter1}>
          <Image source={Images.AddChildDetails} style={Styles.emptyImg} />

          <Text style={[Styles.title1, Styles.fontMedium24]}>{Strings.ListEmpty}</Text>
          <Text style={[Styles.subtitle, Styles.fontBook18]}>No {route.params.name} selected yet!</Text>

          <TouchableOpacity style={Styles.btnPrimary1} onPress={() => navigation.navigate('AddCategory')}>
            <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.Add}</Text>
          </TouchableOpacity>
        </View>
    </>
  );
}


export default EmptyCategory;


