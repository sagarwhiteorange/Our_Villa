import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default axios.create({baseURL: 'http://3.143.212.113/api/'});

async function getHeaders() {
    var token = await AsyncStorage.getItem('token');
    if (!token) {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    } else {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": token,
        }
    }
}

async function formDataHeaders() {
    var token = await AsyncStorage.getItem('token');
    if (!token) {
        return {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    } else {
        return {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        }
    }
}

export async function GETRequest(url: any, params: any) {
    let headers = await getHeaders();

    try{
        const config = {
            method: 'GET',
            url: url,
            data: params,
            headers: headers
        }
        const response = await axios(config)
        return getResponse(response)
    } catch (err) {
        console.log('Network Error', err);
        return getError(err)
    }
}

export async function POSTRequest(url: any, params: any) {
    let headers = await getHeaders();

    try{
        const config = {
            method: 'POST',
            url: url,
            data: params,
            headers: headers,
            body: JSON.stringify(params),
        }
        const response = await axios(config)
        return getResponse(response)
    } catch (err) {
        console.log('Network Error', err);
        return getError(err)
    }
}

export async function postMultipartRequest(url: any, params: any) {
    let headers = await formDataHeaders();    
    console.log("URL ====>", url)
    console.log("params ====>", params)
    console.log("headers ====>", headers)
    try {
        const config = {
            method: 'POST',
            url: url,
            data: params,
            headers: headers
        };
        const response = await axios(config);
        return getResponse(response);
    } catch (err) {
        console.log(err)
        return getError(err)
    }
    
}

export async function UserPOSTRequest(url: any, params: any) {
    let headers = await formDataHeaders();

    try{
        const config = {
            method: 'POST',
            url: url,
            data: params,
            headers: headers,
            body: JSON.stringify(params),
        }
        const response = await axios(config)
        return getResponse(response)
    } catch (err) {
        console.log(err);
        return getError(err)
    }
}



const getResponse = async (response: any) => {
    if (response.status == 200 || response.status == 201) {
        let result = {
            status: true,
            data: response?.data ?? null,
            error: response?.data?.message ?? '',
        };
        return result;
    } else {
        let result = {
            status: false,
            data: response?.data ?? null,
            error: response?.data?.message ?? 'Something went wrong',
        };
        return result;
    }
};

const getError = (error: any) => {
    var message = '';
    var obj = null;
    if (error.response) {
        if (error.response.data) {
            obj = error.response.data;
            if (error.response.data.message) {
                message = error.response.data.message;
            } else {
                message = JSON.stringify(error.response.data.message);
            }
        } else {
            obj = error.response;
            message = 'Something went wrong';
        }
    } else {
        obj = error;
        message = error.message;
    }

    let data = {
        status: false,
        data: obj,
        error: message,
        status_code: error?.response?.status ?? '',
    };
    return data;
};


