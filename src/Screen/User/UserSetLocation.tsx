import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native';
import Geolocation from 'react-native-geolocation-service'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Styles from '../../Styles/Styles';
// import Images from '../../Constant/Images';
// import UserHome from './UserHome';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateAddress } from '../../Api/Method';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Images from '../../Constant/Images';

enum Url {
    UserHome = 'UserHome',
}

const UserSetLocation = (props: any) => { 

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase, Url>>()

    const [latitude, setLatitude] = useState<any>(0);
    const [longitude, setLongitude] = useState<any>(0);
    const [address, setAddress] = useState<string>('')

    useEffect(() => {
        RequestCameraPermission()
        GetLocation()
    }, [])

   

    const RequestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation services',
                    message: 'Get location',
                    buttonNeutral: 'Ask me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Get location ==>', PermissionsAndroid.RESULTS.GRANTED);
            } else {
                console.log('Get location');
            }
        } catch (error) {
            console.log('Geo location error ======>', error);
        }
    }


    const GetLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log('position ===============>', position)
                setLatitude(position?.coords?.latitude)
                setLongitude(position?.coords?.longitude)
                
            },
            error => {
                console.log(error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 15000 }
        )
    }

    Geocoder.init('AIzaSyCsO2bAHF60YA-JSJZ1FxNrZPF7GG1wH1w');    

    Geocoder.from(latitude, longitude)
    .then(json => {
        var response = json.results[0].formatted_address;
        setAddress(response)
        // console.log('addressComponent ===========>', response);
    })
    .catch(error =>
        console.warn(error)
    );

    const setLocation = async() => {
        const params = {
            user_id: '1',
            address: address,
            longitude: longitude.toString(),
            latitude: latitude.toString()
        }
        try {
            const response = await UpdateAddress(params)
            await AsyncStorage.setItem('Address', address);
            await AsyncStorage.setItem('longitude', longitude.toString());
            await AsyncStorage.setItem('latitude', latitude.toString());
            console.log('Get address response =====>', response);
            navigation.navigate('UserHome');
        } catch (error) {
            console.error('Get address error =====>', error);
        }
    }
    
    const handleBack = () => {
        navigation.goBack();
    }

    return (
        <>
        <View>
            <View style={[Styles.headerBox, Styles.alignItemCenter]}>
                <TouchableOpacity onPress={handleBack}>
                    <Image source={Images.back} style={Styles.backIcon}/>
                </TouchableOpacity>
                <GooglePlacesAutocomplete 
                    query={{
                        key: 'AIzaSyCsO2bAHF60YA-JSJZ1FxNrZPF7GG1wH1w',
                        language: 'en'
                    }}
                    onPress={(data, details = null) => {
                        console.log(data, details);                        
                    }}
                    styles={{
                        container: {
                            paddingLeft: 10,
                            borderBottomColor: '#d1d1d1',
                            borderBottomWidth: 1,
                            zIndex: 99,
                        },
                    }}
                    
                    placeholder='Search'
                    fetchDetails={true}

                />
            </View>
            <MapView style={{ height: Dimensions.get('window').height / 1 }}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: latitude, 
                    longitude: longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onRegionChangeComplete={(region) => {setLatitude(region.latitude); setLongitude(region.longitude)}}
                showsUserLocation={true}
                showsMyLocationButton={true}
                // gestureHandling="none"
            >
                <Marker coordinate={{ latitude, longitude }}></Marker>
            </MapView>
            
            <View style={{position: 'absolute', bottom: 80, backgroundColor:'#FFF', height: 180, borderRadius: 20, width: '100%', paddingHorizontal: 25,}}>
                <Text style={[Styles.fontBook18, {paddingTop: 20}]}>Seleted Location</Text>
                <Text style={[Styles.fontMedium18, {paddingVertical: 15, color:'#000'}]}>{address}</Text>

                <TouchableOpacity style={[Styles.btnBlue, {marginBottom: 0}]} onPress={setLocation}>
                    <Text style={[Styles.textWhite, Styles.fontMedium18]}>Confirm Location</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
    );
}

export default UserSetLocation;
