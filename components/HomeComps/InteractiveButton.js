// InteractiveButton component
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const InteractiveButton = ({ backgroundColor, textColor, buttonText, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={[styles.button, { backgroundColor: backgroundColor }]}>
          <Text style={[styles.buttonText, { color: textColor }]}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default InteractiveButton;
