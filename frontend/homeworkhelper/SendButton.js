import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

const SendButton = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://10.0.0.4:3000/api/data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error ftching data: ', error);
    }
  };

  return (
    <View>
      <Button title="Fetch Data" onPress={fetchData} />
      {data && <Text>{JSON.stringify(data)}</Text>}
    </View>
  );
};

export default SendButton;

