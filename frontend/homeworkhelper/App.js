import React, {useState} from 'react';
import { View, Text, ScrollView, useWindowDimensions } from 'react-native';
import SendButton from './SendButton';
import ResultContainer from './ResultContainer';

const App = () => {

  const {height, width} = useWindowDimensions()
  const [data, setData] = useState(null);
  const [outputHeight, setOutputHeight] = useState(height * .65)
  function handleSizeChange(newHeight) {
    setOutputHeight((height * .65) - newHeight + 10)
  }

  return (
    <View>
      <View style={Styles.appTitleView}>
        <Text style={Styles.appTitleText}>Homework</Text>
        <Text style={Styles.appTitleText}>Helper</Text>
      </View>
      <Text style={Styles.textPrompt}>Submit your homework question and ChatGPT will help</Text>
      <SendButton 
        setData={setData} 
        sizeChange={handleSizeChange}
      />
      <ScrollView style={{height: outputHeight}}>
        {data && <ResultContainer data={data.content}/>}
      </ScrollView>
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
  },
  container: {
    height: "65%"
  }
};

export default App;

