import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Animated, Easing, ActivityIndicator } from 'react-native';

const SendButton = () => {
  const [data, setData] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [loading, setLoading] = useState(false)
  const [pressed, setPressed] = useState(false);
  const scaleValue = new Animated.Value(1);

  const dataToSend = {
    message: "What is a healthy meal that I can eat?",
  }

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

  const buttonStyle = { // needed access to some variables, otherwise would be in stylesheet below
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
    // transform: [{ scale: scaleValue }],
  };

  const fetchData = async () => {
    if (userInput) {
      setLoading(true)
      setData(null)
      try {
        const response = await fetch('http://192.168.1.74:3000/api/data', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userInput,
          }),
        });
        console.error("Hi dataToSend" + dataToSend);
        const jsonData = await response.json();
        console.error('jsonData:' + jsonData);
        setData(jsonData.message);
        console.error("after setData");
      } catch (error) { // this takes a very long time to fail
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
      />
      <Pressable 
        onPress={fetchData}
        onPressIn={startScaleAnimation}
        onPressOut={endScaleAnimation}
        style={({ pressed }) => [buttonStyle, pressed && { backgroundColor: '#98c1d9' }]}

      >
        <Text style={Styles.buttonText}>Fetch Data</Text>
      </Pressable>
      {loading && (<ActivityIndicator />)}
      {/* {console.error("data: " + data)} */}
      {data && <Text>{JSON.stringify(data.content)}</Text>}

    </View>
  );
};

const Styles = StyleSheet.create({
  sendBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: "80%"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
})

export default SendButton;