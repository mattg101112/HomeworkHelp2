import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

const SendButton = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data: ', error);
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