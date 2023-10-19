import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

const SendButton = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://10.0.0.4:3000/api/data');
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

