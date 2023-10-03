import { Dimensions, StyleSheet } from "react-native";
import Colors from "../Theme/Colors";
import Fonts from "../Theme/Fonts";

const width = Dimensions.get('window')
const height = Dimensions.get('window')

const Styles = StyleSheet.create({

    fontBook12: Fonts.fontBook12, fontBook14: Fonts.fontBook14, fontBook16: Fonts.fontBook16, 
    fontBook18: Fonts.fontBook18, fontBook20: Fonts.fontBook20, 
    fontBook22: Fonts.fontBook22, fontBook24: Fonts.fontBook24, fontBook30: Fonts.fontBook30, 
    fontBook36: Fonts.fontBook36, fontBook48: Fonts.fontBook48,  

    fontMedium12: Fonts.fontMedium12, fontMedium14: Fonts.fontMedium14, fontMedium16: Fonts.fontMedium16, 
    fontMedium18: Fonts.fontMedium18, fontMedium20: Fonts.fontMedium20, 
    fontMedium22: Fonts.fontMedium22, fontMedium24: Fonts.fontMedium24, fontMedium30: Fonts.fontMedium30, 
    fontMedium36: Fonts.fontMedium36, fontMedium48: Fonts.fontMedium48,  

    fontBold12: Fonts.fontBold12, fontBold14: Fonts.fontBold14, fontBold16: Fonts.fontBold16, 
    fontBold18: Fonts.fontBold18, fontBold20: Fonts.fontBold20, 
    fontBold22: Fonts.fontBold22, fontBold24: Fonts.fontBold24, fontBold30: Fonts.fontBold30, 
    fontBold36: Fonts.fontBold36, fontBold48: Fonts.fontBold48,  

    m10: {margin: 10}, m15: {margin: 15}, mt5: {marginTop: 5}, mt48: {marginTop: 48}, mt60: {marginTop: 60},
    mt80: {marginTop: 80}, mt100: {marginTop: 100}, mt120: {marginTop: 120}, mt140: {marginTop: 140},
    mt15: {marginTop: 15},mt10: {marginTop: 10},

    flex3: {flex: 3}, flex1: {flex: 1}, flex2: {flex: 2},
    marginHorizontal15: {marginHorizontal: 15}, marginHorizontal20: {marginHorizontal: 20},
    marginHorizontal25: {marginHorizontal: 25}, marginVertical20: {marginVertical: 20},
    marginVertical10: {marginVertical: 10}, marginVertical5: {marginVertical: 5},

    mb10: {marginBottom: 10}, mb20: {marginBottom: 20}, mb40: {marginBottom: 40},
    mt20: {marginTop: 20}, mt30: {marginTop: 30},
    pl10: {paddingLeft: 10}, pr20: {paddingRight: 20}, pl20: {paddingLeft: 20},

    ml10: {marginLeft: 10},mr0: {marginRight: 0},mr10: {marginRight: 10},
    mr15: {marginRight: 15},mr30: {marginRight: 30},pt10: {paddingTop: 10}, pb10: {paddingBottom: 10}, paddingVertical15: {paddingVertical:15}, paddingVertical10: {paddingVertical:10},
    
    textWhite: {
        lineHeight: 21,
        color: Colors.textWhite,
        textAlign: 'center',
        
        
    },

    btnSecondary: {
        backgroundColor: '#D8DADB',
        borderRadius: 12,
        padding: 15,
        justifyContent: 'flex-end',
        height: 55,
        marginBottom: 15,
        
    },

    userTitle: {
        lineHeight: 40,
        color: Colors.textBlack, 
        maxWidth: 170,
        
    },
    
    btnBlue: {
        backgroundColor: '#03849C',
        borderRadius: 12,
        padding: 15,
        justifyContent: 'flex-end',
        height: 55,
        marginBottom: 15
    },

    btnDisable: {
        backgroundColor: '#D5D9DA',
        borderRadius: 12,
        padding: 15,
        justifyContent: 'flex-end',
        height: 55,
        marginBottom: 15
    },
    
    fontGray12: {
        lineHeight: 20,
        paddingTop: 10,
        color: Colors.textGray, 
        maxWidth: 170
    },
    fontBlack12: {
        lineHeight: 20,
        paddingTop: 10,
        color: Colors.textBlack, 
        maxWidth: 170
    },
    
    fontBlack14: {
        lineHeight: 20,
        color: Colors.textBlack
    },
    fontBlue14: {
        lineHeight: 20,
        color: Colors.textPrimary
    },
    fontGray16: {
        lineHeight: 25,
        color: Colors.textLightGray, 
        textAlign: 'center',
        maxWidth: 340,
        alignSelf: 'center'
    },
    fontBlack16: {
        lineHeight: 20,
        color: Colors.textBlack
    },
    fontMedium15: {
        lineHeight: 25,
        color: Colors.textBlack
    },
    fontGray15: {
        lineHeight: 22,
        color: Colors.textGray
    },
    fontBlack18: {
        lineHeight: 20,
        color: Colors.textBlack
    },
    fontBlack24: {
        lineHeight: 35,
        color: Colors.textBlack, 
        textAlign: 'center',
        paddingVertical: 15,
        maxWidth: 250,
        alignSelf: 'center'
    },
    checkbox: {
        width: 25,
        height: 25
    },
    
    fontGreen24: {
        lineHeight: 28,
        color: Colors.textGreen
    },
    fontBlackMedium24: {
        lineHeight: 28,
        color: Colors.textBlack
    },
    fontGreen14: {
        lineHeight: 28,
        color: Colors.textGreen
    },
    fontGreen16: {
        lineHeight: 28,
        color: Colors.textGreen
    },
    fontGreen12: {
        lineHeight: 28,
        color: Colors.textGreen
    },
    fontTabWhite16: {
        lineHeight: 25,
        color: Colors.textWhite
    },
    fontTabGray16: {
        lineHeight: 25,
        color: Colors.textGray
    },

    paddingVertical5: {
        paddingVertical: 5
    },
    textCenter: {
        textAlign: 'center'
    },
    
    userTypeImg: {
        width: 132,
        height: 132
    },
    userCart: {
        height: 160,
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        paddingHorizontal: 15, 
        paddingTop: 15, 
        marginVertical: 20, 
        backgroundColor: Colors.bgWhite, 
        borderRadius: 12, 
        shadowColor: "#919D9E",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'relative',
        opacity: 100
    },
    
    flexJustifyCenter: {
        flex: 1, 
        justifyContent: 'center'
    },
    flexJustifyEnd: {
        flex: 1, 
        justifyContent: 'flex-end', 
        alignSelf: 'flex-end'
    },
    

    OnBoardingImg: {
        width: Dimensions.get('window').width / 1.2 , 
        height: Dimensions.get('screen').height / 2.8, 
        alignSelf: 'center',
    },
    OnBoardingImgView: {
        flex: 2, 
        width: Dimensions.get('window').width, 
        height: Dimensions.get('screen').height / 2.5, 
        justifyContent: 'center',
    },
    OnBoardingTextView: {
        flex: 2, 
        width: Dimensions.get('window').width, 
        height: Dimensions.get('screen').height / 1.75, 
    },
    textPrimary: {
        position: 'absolute',
        right: 30,
        top: 30,
        lineHeight: 20,
        color: Colors.textPrimary
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    
    formControl: {
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 15, 
        backgroundColor: Colors.bgWhite, 
        borderRadius: 12, 
        marginVertical: 10,
        shadowColor: "#919D9E",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    socialIconBox: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center', 
        paddingHorizontal: 15, 
        backgroundColor: Colors.bgWhite, 
        borderRadius: 12, 
        marginVertical: 10,
        shadowColor: "#919D9E",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
        width: 48, 
        height: 48, 
        marginHorizontal: 10
    },
    socialIconGoogle: {
        width: 19,
        height: 20
    },
    socialIconFacebook: {
        width: 10,
        height: 20
    },
    loginBrand: {
        width: 90,
        height: 90
    },
    flexRow: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    flexBetween: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
    },
    authIconWidth: {
        width: 20, 
        height: 20
    },
    BookingIcon: {
        width: 20, 
        height: 20,
        marginRight: 10
    },
    VerticalLine: {
        width: Dimensions.get('screen').width / 1.2, 
        height: 1, 
        backgroundColor: '#d1d1d1', 
        marginVertical: 15
    },
    alignCenter: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    alignStart: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
    },
    alignStart1: {
        flexDirection: 'row', 
        alignItems: 'flex-start',
    },
    profile: {
        width: 80, 
        height: 80, 
        marginRight: 20
    },
    bookingCart: {
        height: Dimensions.get('screen').height / 5.2,
        paddingHorizontal: 15,
        paddingTop: 15,
        marginVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: "#919D9E",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#FFF'
    },
    offerCart: {
        height: Dimensions.get('window').height / 3.2,
        paddingHorizontal: 15,
        paddingTop: 15,
        marginVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: "#919D9E",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    alignSelfEnd: {
        alignSelf: 'flex-end'
    },
    CustomWidth: {
        width: Dimensions.get('window').width / 1.35
    },
    OTPBox: {
        width: 22,
        height: 50,
    },

    w80: {
        width: Dimensions.get('screen').width / 1.08
    },
    button: {
        position: 'absolute',
        alignSelf: 'center',
        padding: 0,
    },
    uploadDocShow: {
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 40, 
        backgroundColor: Colors.bgLightBlue, 
        borderRadius: 12, 
        marginVertical: 10,
        height: Dimensions.get('screen').height / 5.5,
        width: Dimensions.get('screen').width / 1.8,
    },
    uploadDoc: {
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 40, 
        backgroundColor: Colors.bgLightBlue, 
        borderRadius: 12, 
        marginVertical: 10,
        shadowColor: "#919D9E",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 5,  
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#D5D9DA',
        height: Dimensions.get('screen').height / 5.5,
        width: Dimensions.get('screen').width / 1.8,
    },
    uploadProof: {
        backgroundColor: Colors.bgWhite, 
        borderRadius: 12, 
        marginVertical: 30,
        paddingVertical: 22,
        shadowColor: "#919D9E",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
        paddingHorizontal: 22,
        width: Dimensions.get('window').width / 1.1, 
        height: Dimensions.get('screen').height / 1.55,
    },
    docImg: {
        width: 26,
        height: 26,
        marginBottom: 15
    },
    Skip: {
        position: 'absolute',
        right: 25,
        top: 25,
        zIndex: 99
    },
    DocBox: {
        marginBottom: 10,
        height: Dimensions.get('screen').height / 3, 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative'
    },
    JustifyBetween: {
        justifyContent: 'space-between'
    },
    justifyStart: {
        justifyContent: 'flex-start'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    alignStart: {
        alignItems: 'flex-start',
    },
    alignItemCenter: {
        alignItems: 'center',
    },
    SettingIcon: {
        width: 50,
        height: 50
    },
    ItemCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: '#03849C'
    },
    tabBar: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 30, 
        backgroundColor: '#FFF',
        borderRadius: 12,
        shadowColor: "#919D9E",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: Dimensions.get('window').width / 1.090,
        height: 45
    },
    btnTab: {
        flexDirection: 'row',
        padding: 9,
        width: Dimensions.get('window').width / 3.25,
        justifyContent: 'center',
        borderRadius: 8,
        height: 45
    },
    boxShadow: {
        backgroundColor: '#FFF', 
        borderRadius: 12, 
        padding: 15,
        shadowColor: "#919D9E",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
    btnCancel: {
        backgroundColor: '#D8DADB',
        borderRadius: 12,
        width: Dimensions.get('window').width / 2.55,
        marginTop: 20,
        padding: 15,
        justifyContent: 'flex-end',
        height: 55
    },
    btnAccept: {
        backgroundColor: '#03849C',
        borderRadius: 12,
        width: Dimensions.get('window').width / 2.55,
        marginTop: 20,
        padding: 15,
        justifyContent: 'flex-end',
        height: 55
    },
    textGray16: {
        lineHeight: 21,
        color: '#818D8E',
        textAlign: 'center'
    },
    textPrimary16: {
        lineHeight: 21,
        color: '#FFF',
        textAlign: 'center'
    },
    btnPrimary: {
        backgroundColor: '#03849C',
        borderRadius: 12,
        width: Dimensions.get('window').width / 2.55,
        marginTop: 20,
        padding: 15,
        justifyContent: 'flex-end',
        height: 55
    },
    btnPrimary1: {
        backgroundColor: '#03849C',
        borderRadius: 12,
        padding: 15,
        justifyContent: 'center',
        height: 48,
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width / 3.5,
        marginTop: 20
    },
    MaxWidth180: {
        maxWidth: 180
    },
    MaxWidth280: {
        maxWidth: 280
    },
    AppointmentCard: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: Dimensions.get('window').width / 1.15
    },
    recentPic: {
        width: 60, height: 60
    },
    bottomBar: {
        backgroundColor: '#FFF', 
        borderRadius: 12, 
        padding: 15,
        shadowColor: "#919D9E",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 80,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 20
    },
    tabBarFontGray12: {
        lineHeight: 14,  
    },
    btnOutLinePrimary: {
        backgroundColor: 'transparent',
        borderColor: '#03849C',
        borderWidth: 1,
        borderRadius: 12,
        padding: 15,
        justifyContent: 'center',
        height: 55,
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get('window').width / 1.08,
        marginTop: 15
    },
    textPrimary: {
        lineHeight: 18,
        color: '#03849C',
        textAlign: 'center'
    },
    btnPrimary: {
        backgroundColor: '#03849C',
        borderRadius: 12,
        padding: 15,
        justifyContent: 'center',
        height: 55,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 15,
        width: Dimensions.get('window').width / 1.08,
    },
    textWhite: {
        lineHeight: 18,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    textBlack: {
        color: Colors.textBlack
    },
    emptyImg: {
        width: Dimensions.get('window').width / 1.8, 
        height: Dimensions.get('window').height / 4.5, 
        alignSelf: 'center'
    },
    userDetails: {
        lineHeight: 16,
        color: '#919D9E',
        marginLeft: 0, 
        marginVertical: 8, 
        maxWidth: 200
    },
    
    title: {
        lineHeight: 18,
        color: '#0B1C1f',
    },
    title1: {
        lineHeight: 28,
        color: '#0B1C1F',
        textAlign: 'center',
        marginTop: 25
    },
    subtitle: {
        lineHeight: 20,
        color: '#000000',
        textAlign: 'center',
        marginTop: 5
    },
    w16: {
        width: 16
    },
    h16: {
        height: 16
    },
    h25: {
        height: 25
    },
    mb150: {
        marginBottom: 150
    },
    VerificationDocBox: {
        width: Dimensions.get('window').width / 1.2, 
        height: 1, 
        backgroundColor: '#D8DADB', 
        alignSelf: 'center'
    },
    bgWhiteBorder12: {
        backgroundColor: '#FFF', 
        marginTop: 15, 
        borderRadius: 12
    },
    radioButton: {
        position: 'absolute', 
        top: 15, 
        right: 15
    },
    selectImg: {
        height: 160, 
        borderRadius: 12, 
        top: -15, 
        right: -15, 
        width: Dimensions.get('window').width / 1.08, 
    },
    absolute: {
        position: 'absolute'
    },
    top0: {
        top: 0
    },
    right0: {
        right: 0
    },
    logo: {
        width: 140, 
        height: 140
    },
    flexCenter1: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    flexCenter: {
        flex: 2, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    flexEnd: {
        flex: 2, 
        alignItems: 'center', 
        justifyContent: 'flex-end'
    },
    flexStart: {
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start'
    },
    splashImg: {
        width: '100%', 
        height: 312
    },
    uploadDocWidth: {
        width: Dimensions.get('screen').width / 1.20,
        height: Dimensions.get('screen').height / 4.3
    },
    UserDocWidth: {
        width: Dimensions.get('screen').width / 1.08,
        height: Dimensions.get('screen').height / 4.3,
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 40, 
        backgroundColor: Colors.bgLightBlue, 
        borderRadius: 12, 
        marginVertical: 10,
        shadowColor: "#919D9E",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: '#D5D9DA',
    },
    btnOutLineDanger: {
        borderColor: '#EB5757', 
        borderWidth: 1.5, 
        borderRadius: 12, 
        padding: 12, 
        marginTop: 30
    },
    textRed: {
        color: Colors.textRed
    },
    CategoryImg: {
        width: 150, height: 104
    },
    border:{
        borderWidth: 1, borderColor: '#D8DADB'
    },
    star: {
        width: 12, height: 12, marginHorizontal: 3
    },
    height1_2: {
        height: Dimensions.get('window').height / 1.2
    },
    height1_97: {
        height: Dimensions.get('window').height / 1.97
    },
    height3_9: {
        height: Dimensions.get('window').height / 3.9
    },
    height4_3: {
        height: Dimensions.get('window').height / 4.3
    },
    height6_5: {
        height: Dimensions.get('window').height / 6.5
    },
    height55: {
        height: 55
    },
    width1_2: {
        width: Dimensions.get('window').width / 1.2
    },
    width1_08: {
        width: Dimensions.get('window').width / 1.08
    },
    w48: {
        width: '48%'
    },
    borderRadius0: {
        borderRadius: 0
    },
    bgDanger: {
        borderRadius: 8, 
        marginVertical: 5, 
        marginHorizontal: 5,
        backgroundColor: Colors.bgDanger
    },
    bgBlue: {
        borderRadius: 8, 
        marginVertical: 5, 
        marginHorizontal: 5,
        backgroundColor: Colors.bgBlue
    },
    bgWarning: {
        borderRadius: 8, 
        marginVertical: 5, 
        marginHorizontal: 5,
        backgroundColor: Colors.bgWarning, 
    },
    bgSuccess: {
        borderRadius: 8, 
        marginVertical: 5, 
        marginHorizontal: 5,
        backgroundColor: Colors.bgSuccess
    },
    bgOrchid: {
        borderRadius: 8, 
        marginVertical: 5, 
        marginHorizontal: 5,
        backgroundColor: Colors.bgOrchid
    },
    bgDarkPink: {
        borderRadius: 8, 
        marginVertical: 5, 
        backgroundColor: Colors.bgDarkPink, 
    },
    fontDanger: {
        lineHeight: 20,
        paddingHorizontal: 15, 
        textAlign: 'center', 
        paddingVertical: 10,
        color: Colors.textDanger 
    },
    fontBlue: {
        lineHeight: 20,
        paddingHorizontal: 15, 
        textAlign: 'center', 
        paddingVertical: 10,
        color: Colors.textBlue 
    },
    fontWarning: {
        lineHeight: 20,
        paddingHorizontal: 15, 
        textAlign: 'center', 
        paddingVertical: 10,
        color: Colors.textWarning 
    },
    fontDarkPink: {
        lineHeight: 20,
        paddingHorizontal: 15, 
        textAlign: 'center', 
        paddingVertical: 10,
        color: Colors.textDarkPink 
    },
    fontOrchid: {
        lineHeight: 20,
        paddingHorizontal: 15, 
        textAlign: 'center', 
        paddingVertical: 10,
        color: Colors.textOrchid 
    },
    fontSuccess: {
        lineHeight: 20,
        paddingHorizontal: 15, 
        textAlign: 'center', 
        paddingVertical: 10,
        color: Colors.textSuccess 
    },
    uploadDelete: {
        width: 30,
        height: 30,
        marginHorizontal: 5
    },
    uploadEdit: {
        width: 38,
        height: 38,
        marginHorizontal: 5
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        borderRadius: 20,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingBottom: 20,
        elevation: 20
    },
    recentlyTitle: {
        lineHeight: 20,
        color: Colors.textBlack,
        ...Fonts.fontMedium18,
        marginVertical: 10
    },
    pdfContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdfView: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    uploadDocumentView: {
        backgroundColor: '#fff',
        width: '95%',
        height: 230,
        borderRadius: 15,
        marginBottom: 15,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    uploadDocTitle: {
        lineHeight: 20,
        color: Colors.textBlack,
        textAlign: 'center',
        marginVertical: 20,
        ...Fonts.fontMedium18
    },
    uploadDocBtn: {
        marginLeft: 25, 
        marginVertical: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    uploadDocImg: {
        width: 30,
        height: 30
    },
    docTitle: {
        color: '#000', 
        marginLeft: 10,
        ...Fonts.fontBook18
    },
    viewDocument: {
        width: Dimensions.get('screen').width / 1.20,
        height: Dimensions.get('screen').height / 4.3,
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 40, 
        backgroundColor: Colors.bgLightBlue, 
        borderRadius: 12, 
        marginVertical: 10,
    },
    UserViewDocument: {
        width: Dimensions.get('screen').width / 1.08,
        height: Dimensions.get('screen').height / 4.3,
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 40, 
        backgroundColor: Colors.bgLightBlue, 
        borderRadius: 12, 
        marginVertical: 10,
    },
    headerBox: {
        backgroundColor: '#fff', 
        padding: 15,
        shadowColor: "#919D9E",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: Dimensions.get('window').width / 1,
        height: 80,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTitle: {
        textAlign: 'center',
        fontFamily: 'GothamRounded-Medium',
        fontWeight: '400',
        fontSize: 20,
        color: '#0B1C1F',
    },
    searchIcon: {
        width: 22, height: 22
    },
    backIcon: {
        width: 28, height: 28
    },
    clear: {
        fontFamily: 'GothamRounded-Medium',
        fontWeight: '300',
        fontSize: 14,
        color: '#03849C',
    }

})

export default Styles;