import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Modal } from 'react-native';
import Styles from '../Styles/Styles';

const SuccessfullyMsg = ({visible, children} : {visible: any, children: any}) => {

  const [showModal, setShowModal] = useState(visible)
  const scaleValue = React.useRef(new Animated.Value(0)).current

  const toggleModal = () => {
    if(visible) {
      setShowModal(true)
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    } else {
      setShowModal(false)
    }
  }

  useEffect(() => {
    toggleModal()
  }, [visible])

  return (
    <>
      <Modal transparent visible={showModal}>
        <View style={Styles.modalBackground}>
          <Animated.View style={[Styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </Modal>    
    </>
  );
}

export default SuccessfullyMsg;
