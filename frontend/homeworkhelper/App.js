import React from 'react';
import { View, Text } from 'react-native';
import SendButton from './SendButton';

const App = () => {
  return (
    <View style={Styles.container}>
      <Text>Submit your homework question and Chatgpt will help you</Text>
      <SendButton />
    </View>
  );
};


const Styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
};

export default App;

