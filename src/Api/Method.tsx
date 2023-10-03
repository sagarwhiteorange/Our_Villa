import axios from "axios";
import API_SERVICE from "./API_SERVICE";
import { GETRequest, POSTRequest, UserPOSTRequest, postMultipartRequest } from "./Request";

async function login(params: any) {
    let url = API_SERVICE.login
    const result = await POSTRequest(url, params)
    return result
}

async function Register(params: any) {
    let url = API_SERVICE.Register
    const result = await POSTRequest(url, params)
    return result
}

async function CheckEmail(params: any) {
    let url = API_SERVICE.CheckEmail
    const result = await POSTRequest(url, params)
    return result
}

async function UserRegister(params: any) {
    let url = API_SERVICE.Register
    try {
        const result = await postMultipartRequest(url, params);
        console.log('Success:', result.data);
        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios Error:', error.message);
          if (error.response) {
            console.error('Server responded with:', error.response.status);
            console.error('Response data:', error.response.data);
          }
        } else {
          console.error('Error:', error.message);
        }
        throw error;
    }
}

async function ForgotPassword(params: any) {
    let url = API_SERVICE.ForgotPassword
    const result = await POSTRequest(url, params)
    return result
}

async function VerifyOTP(params: any) {
    let url = API_SERVICE.VerifyOTP
    const result = await POSTRequest(url, params)
    return result
}

async function ResetPassword(params: any) {
    let url = API_SERVICE.ResetPassword
    const result = await POSTRequest(url, params)
    return result
}

async function CaretakerPersonList(params: any) {
    let url = API_SERVICE.CaretakerPersonList
    const result = await POSTRequest(url, params)
    return result
}

async function UpdateAddress(params: any) {
    let url = API_SERVICE.UpdateAddress
    const result = await POSTRequest(url, params)
    return result
}

async function CaretakerPerson(params: any) {
    let url = API_SERVICE.CaretakerPerson
    const result = await postMultipartRequest(url, params)
    return result
}

async function CategoryList(params: any) {
    let url = API_SERVICE.CategoryList
    const result = await GETRequest(url, params)
    return result
}

async function HomeCarePersonList(params: any) {
    let url = API_SERVICE.HomeCarePersonList       
    const result = await GETRequest(url, params)
    return result
}

async function HomeCarePersonDetails(id: any, slug: any, params: any) {
    let url = `${API_SERVICE.HomeCarePersonDetails}${slug}/${params}`
    const result = await GETRequest(url, params)
    return result
}

async function BookingPast(params: any) {
    let url = API_SERVICE.BookingPast
    const result = await POSTRequest(url, params)
    return result
}

async function BookingCurrent(params: any) {
    let url = API_SERVICE.BookingCurrent
    const result = await POSTRequest(url, params)
    return result
}

async function BookingUpComing(params: any) {
    let url = API_SERVICE.BookingUpComing
    const result = await POSTRequest(url, params)
    return result
}

async function CountryList(params: any) {
    let url = API_SERVICE.CountryList       
    const result = await GETRequest(url, params)
    return result
}

async function StateList(params: any) {
    let url = API_SERVICE.StateList
    const result = await POSTRequest(url, params)
    return result
}

async function CityList(params: any) {
    let url = API_SERVICE.CityList
    const result = await POSTRequest(url, params)
    return result
}

async function BookingAdd(params: any) {
    let url = API_SERVICE.BookingAdd
    const result = await POSTRequest(url, params)
    return result
}

async function NextAppointments(params: any) {
    let url = API_SERVICE.NextAppointments
    const result = await POSTRequest(url, params)
    return result
}

export {
    login, 
    Register,
    CategoryList,
    ForgotPassword,
    VerifyOTP,
    ResetPassword,
    UserRegister,
    CaretakerPerson,
    CheckEmail,
    HomeCarePersonList,
    HomeCarePersonDetails,
    CaretakerPersonList,
    UpdateAddress,
    BookingPast,
    BookingCurrent,
    BookingUpComing,
    CountryList,
    StateList,
    CityList,
    BookingAdd,
    NextAppointments
}
