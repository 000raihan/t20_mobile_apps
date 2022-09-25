import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../constants/colors';

const MainButton = props => {
  return (
    <TouchableOpacity style={props.style} activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.yellow,
    paddingVertical: 5,
    paddingHorizontal: 30,
    marginVertical:4
    // borderRadius: 25
  },
  buttonText: {
    color: 'black',
    fontFamily: 'open-sans',
    fontSize: 18
  }
});

export default MainButton;
