import React from 'react';
import { View, Text } from 'react-native';
import SendButton from './SendButton';

const App = () => {
  return (
    <View>
      <View style={Styles.appTitleView}>
        <Text style={Styles.appTitleText}>Homework</Text>
        <Text style={Styles.appTitleText}>Helper</Text>
      </View>
      <Text style={Styles.textPrompt}>Submit your homework question and ChatGPT will help</Text>
      <SendButton />
    </View>
  );
};


const Styles = {
  appTitleView: {
    textAlign: "left",
    backgroundColor: "#98c1d9",
    padding: 10,
    paddingTop: 30,
    width: "100%",
    
  },
  appTitleText: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 18
  },
  textPrompt: {
    fontSize: 14,
    padding: 10
  }
};

export default App;

