import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

const SendButton = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const dataToSend = {
        message: "What is a healthy meal that I can eat?",
      }
      const response = await fetch('http://192.168.1.74:3000/api/data', {
        method: 'POST',
        headers: {
          Acceopt: 'application/json',
          'Content_Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      const jsonData = await response.json();
      console.error('jsonData:' + jsonData);
      setData(jsonData.message);
      console.error("after setData");
    } catch (error) {
      console.error('Error ftching data: ', error);
    }
  };

  return (
    <View>
      <Button title="Fetch Data" onPress={fetchData} />
      {console.error("data: " + data)}
      {data && <Text>{JSON.stringify(data)}</Text>}
    </View>
  );
};

export default SendButton;

