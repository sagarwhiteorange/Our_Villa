// live server

// const BASE_URL = 'http://3.143.212.113/our_villa/api/'
// export const IMAGE_URL = 'http://3.143.212.113/our_villa/api/'

// local server
const BASE_URL = 'http://192.168.1.90:8080/our_villa/api/'
export const IMAGE_URL = 'http://192.168.1.90:8080/our_villa/api/'


const API_SERVICE = {
    login: `${BASE_URL}login`,
    Register: `${BASE_URL}register`,
    ForgotPassword: `${BASE_URL}forget-password`,
    VerifyOTP: `${BASE_URL}verify-otp`,
    ResetPassword: `${BASE_URL}reset-password`,
    CheckEmail: `${BASE_URL}check-email`,
    CategoryList: `${BASE_URL}category/list`,
    CaretakerPersonList: `${BASE_URL}caretakerperson/list`,
    CaretakerPerson: `${BASE_URL}caretakerperson/store`,
    HomeCarePersonList: `${BASE_URL}homecareperson/list`,
    UpdateAddress: `${BASE_URL}users/update-address`,
    HomeCarePersonDetails: `${BASE_URL}homecareperson/details/`,
    BookingPast: `${BASE_URL}booking/past`,
    BookingCurrent: `${BASE_URL}booking/current`,
    BookingUpComing: `${BASE_URL}booking/upcoming`,
    CountryList: `${BASE_URL}country-list`,
    StateList: `${BASE_URL}states-list`,
    CityList: `${BASE_URL}cities-list`,
    BookingAdd: `${BASE_URL}booking/add`,
    NextAppointments: `${BASE_URL}booking/next`,
    
}

export default API_SERVICE;
