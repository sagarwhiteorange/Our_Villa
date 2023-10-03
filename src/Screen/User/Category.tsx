import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Styles from '../../Styles/Styles';
import AppBg from '../../Common/AppBg';
import { CategoryList } from '../../Api/Method';
import { IMAGE_URL } from '../../Api/API_SERVICE';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from '../../Constant/Strings';
import Images from '../../Constant/Images';


const Category = ({ navigation }: { navigation: any }) => {

  const [loading, setLoading] = useState(false)
  const [Data, setData] = useState()
  const [token, setToken] = useState<string | null>(null)

  const getTokenApi = async() => {
    const value = await AsyncStorage.getItem('token')
    setToken(value)
    GetCategoryList()
  }


  const GetCategoryList = async () => { 
    const params = {
      Authorization: token
    }
    setLoading(true)
    const response = await CategoryList(params)   
    setLoading(false) 
    if(response.status){
      if (response?.data?.ResponseData?.token) {       
        console.log('token ===>', response?.data?.ResponseData?.token);        
      }
      setData(response?.data?.ResponseData?.category)
    }else{    
      console.log('CategoryList API Call  Error ==>', response);
    }
  }

  useEffect(() => {     
    getTokenApi()
  }, [])  


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
            <Text style={Styles.headerTitle}>{Strings.AddCategory}</Text>
            <Text></Text>
        </View>

        <View style={Styles.mt20}>

          <FlatList
            data={Data}
            renderItem={({ item, index }) => {
              return (            
                <View style={Styles.flex1} key={index}>

                  <TouchableOpacity onPress={() => navigation.navigate('EmptyCategory', {name: item.name})}>

                    <View style={[Styles.boxShadow, Styles.m10, Styles.border]}>
                      {item.image ? 
                        <Image source={{uri : item.image}} style={Styles.CategoryImg} resizeMode='contain' />
                        :
                        <Image source={Images.avatar} style={Styles.CategoryImg} resizeMode='contain' />
                      }
                      <Text style={[Styles.fontBlack16, Styles.textCenter, Styles.pt10, Styles.fontBook16]}>
                        {item?.name}
                      </Text>
                    </View>
                  
                  </TouchableOpacity>
                </View>
              )
            }}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </View>
    </>
  );
}



export default Category;


