import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';

const LoadingOverlay = ({visible} : {visible: any}) => {

    if(!visible) return null

    return (
        <View style={style.OverLay}>
            <View style={style.OverLayWhite}>
                <ActivityIndicator size='large' color='#03849C' style={{justifyContent: 'center', flex: 1}}/> 
            </View>
        </View>
    );
    }

const style = StyleSheet.create({
    OverLay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 9
    },
    OverLayWhite: {
        width: 70,
        height: 70,
        backgroundColor: '#FFF',
        borderRadius: 20
    }
})

export default LoadingOverlay;
