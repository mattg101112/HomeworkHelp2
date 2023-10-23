import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Animated, Easing, ActivityIndicator } from 'react-native';
import {MY_IP_ADDRESS} from '@env'

const SendButton = ({setData, sizeChange}) => {

  const [userInput, setUserInput] = useState(null);
  const [loading, setLoading] = useState(false)
  const [pressed, setPressed] = useState(false);
  const scaleValue = new Animated.Value(1);

  function startScaleAnimation() {
    Animated.timing(scaleValue, {
      toValue: 0.95,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setPressed(true);
    });
  }

  function endScaleAnimation() {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setPressed(false);
    });
  }

  const buttonStyle = {
    width: 120,
    height: 40,
    backgroundColor: pressed ? '#98c1d9' : "#3d5a80",
    borderRadius: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  };

  const fetchData = async () => {
    if (userInput) {
      setLoading(true)
      setData(null)
      try {
        // 192.168.1.70 jbm
        // 192.168.1.74 original
        // working on accessing this as a variable, having weird trouble
        const response = await fetch(`http://192.168.1.70:3000/api/data`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userInput,
          }),
        });
        const jsonData = await response.json();
        setData(jsonData.message);
      } catch (error) {
        console.error('Error ftching data: ', error);
      } finally {
        setLoading(false)
      }
    }
  };

  return (
    <View style={Styles.sendBtnView}>
      <TextInput
        style={Styles.input}
        placeholder="Enter your message"
        value={userInput}
        onChangeText={(text) => setUserInput(text)} // Capture user input
        multiline
        maxheight={60}
        numberOfLines={3}
        onContentSizeChange={(e) => {
          sizeChange(e.nativeEvent.contentSize.height)
        }}
      />
      <Pressable 
        onPress={fetchData}
        onPressIn={startScaleAnimation}
        onPressOut={endScaleAnimation}
        style={({ pressed }) => [buttonStyle, pressed && { backgroundColor: '#98c1d9' }]}

      >
        <Text style={Styles.buttonText}>Fetch Data</Text>
      </Pressable>
      {loading && <ActivityIndicator style={{paddingTop:20}}/>}
    </View>
  );
};

const Styles = StyleSheet.create({
  sendBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: "80%",
    maxHeight: 70
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
})

export default SendButton;