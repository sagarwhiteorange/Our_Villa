import AsyncStorage from "@react-native-async-storage/async-storage"

export async function setToken(data: any) {
    await AsyncStorage.setItem('token', data)
}

export async function setItem(data: any) {
    await AsyncStorage.setItem('Address', data)
}

export async function setlongitude(data: any) {
    await AsyncStorage.setItem('longitude', data)
}

export async function setlatitude(data: any) {
    await AsyncStorage.setItem('latitude', data)
}

export async function UserID(data: any) {
    await AsyncStorage.setItem('UserID', data)
}

export async function CaretakerId(data: any) {
    await AsyncStorage.setItem('CaretakerId', data)
}


export async function HomeCareAddress(data: any) {
    await AsyncStorage.setItem('HomeCareAddress', data)
}

export async function Certn(data: any) {
    await AsyncStorage.setItem('Certn', data)
}
