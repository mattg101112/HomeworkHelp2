import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ResultContainer = ({data}) => {
    

    return (
        <View style={Styles.resultView}>
            {data.split(/\n+/).map((para, i) => (
                <Text key={i} style={Styles.paragraph}>{para}</Text>
            ))}
        </View>
    )
}

const Styles = StyleSheet.create({
    resultView: {
        paddingHorizontal: 20,
        minHeight: "100%"
    },
    paragraph: {
        paddingTop: 10,
        fontSize:16
    }
  })

export default ResultContainer