import React, {useEffect, useState} from 'react';
import { Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import AppBg from '../../Common/AppBg';
import Styles from '../../Styles/Styles';
import Images from '../../Constant/Images';
import Strings from '../../Constant/Strings';
import * as Animatable from 'react-native-animatable';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CaretakerPersonList } from '../../Api/Method';

enum Url {
  AddCategory = 'AddCategory',
  UserSetLocation = 'UserSetLocation'
}

const ViewCategory = (props: any) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()

  const [ChildrenList, setChildrenList] = useState<any>('')

  const AddChildrenList = async() => {

    const params = {
      user_id: '1'
    }

    try {
      const response = await CaretakerPersonList(params)
      if(response?.data?.ResponseData?.HomeCarePerson) {
        const respMap = response?.data?.ResponseData?.HomeCarePerson.map((item: any) => item)
        console.log('respMap ==================>', respMap);
        setChildrenList(respMap)
      }
      
    } catch (error) {
      console.log('Add children list error =======>', error)      
    }
  }


  useEffect(() => {
    AddChildrenList()
  },[])


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

        <FlatList 
          data={ChildrenList}
          renderItem={({item}) => (
            <View style={[Styles.marginHorizontal15, Styles.mt20, Styles.flex1]}>
              <View style={Styles.flex1}>
                <Animatable.View duration={3000} animation="slideInLeft" 
                  style={[Styles.boxShadow, Styles.alignCenter, Styles.mb20]}>   
                    {item.profile_pic ? 
                      <Image source={{uri: item.profile_pic}} style={Styles.loginBrand} />
                      :
                      <Image source={Images.avatar} style={Styles.loginBrand} />
                    }                  
                      <View style={Styles.marginHorizontal15}>
                        <Text style={[Styles.title, Styles.fontMedium18]}>{item.fullname}</Text>
                        <Text style={[Styles.userDetails, Styles.fontBook14]}>{item.other_details}</Text>
                        <View style={Styles.alignCenter}>
                          <View style={Styles.alignCenter}>
                            <Image source={Images.age_gray} style={[Styles.w16, Styles.h16]} />
                            <Text style={[Styles.fontBook14]}> {item.age} Years</Text>
                          </View>
                          <View style={[Styles.alignCenter, Styles.ml10]}>
                            <Image source={Images.boy} style={[Styles.w16, Styles.h16]} /> 
                            <Text style={[Styles.fontBook14]}> {item.gender == 'M' ? 'Male' : item.gender == 'F' ? 'Femail' : 'other'}</Text>
                          </View>
                        </View>
                      </View>
                </Animatable.View>                
              </View>         
            </View>
          )}
        />

        
        <TouchableOpacity style={[Styles.btnOutLinePrimary, Styles.mb40]} onPress={() => navigation.navigate('AddCategory')}>
          <Text style={[Styles.textPrimary, Styles.fontMedium18]}>{Strings.Add}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UserSetLocation')} style={[Styles.btnBlue, Styles.marginHorizontal15]}>
          <Text style={[Styles.textWhite, Styles.fontMedium18]}>{Strings.GetStart}</Text>
        </TouchableOpacity>
        
    </>
  );
}



export default ViewCategory;


