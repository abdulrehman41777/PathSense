import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Animated, Easing } from 'react-native';
import Tts from 'react-native-tts';
import InteractiveButton from '../components/HomeComps/InteractiveButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Home = ({ navigation }) => {
  const [tapCount, setTapCount] = useState(0);
  const [textOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    animateText();
  }, []); // Run this effect only once when the component mounts

  const handleVoice = async (text) => {
    Tts.speak(text);
  };

  const animateText = () => {
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: false, // Set to false because opacity animation is not supported on the native driver
    }).start();
  };

  const handleTap = () => {
    setTapCount((prevCount) => prevCount + 1);
    handleVoice(getTextToSpeak(tapCount));
    animateText(); // Re-run the text animation for each tap
  };

  const getTextToSpeak = (tapCount) => {
    switch (tapCount) {
      case 0:
        return "Activate Voice Navigation. You can prompt Siri with specific commands related to exploration.";
      case 1:
        return "Explore Objects. To identify objects around you, use commands like, 'Hey Siri, what's in front of me?' The app will then use advanced object recognition technology to describe the object, providing information such as its name and, if applicable, its color.";
      case 2:
        return "Alert Notification. The device will start vibrating when you are too close to any object.";
      default:
        return navigation_to_main_screen();
    }
  };

  const navigation_to_main_screen = () => {
    navigation.navigate("main")
  }

  return (
    <View style={styles.container} onTouchStart={handleTap}>
      <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
        <Text style={styles.Headings}>{getTextToSpeak(tapCount)}</Text>
      </Animated.View>
      {tapCount === 2 && (
        <View style={styles.Button_margin}>
          <InteractiveButton
            backgroundColor="#4E4EFF"
            textColor="#fff"
            buttonText="Next"
            onPress={navigation_to_main_screen}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000e8",
    justifyContent: "center",
    paddingVertical: hp('5%'),
  },
  textContainer: {
    marginVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  Headings: {
    fontSize: wp('5%'),
    fontWeight: "900",
    color: "#fff",
  },
  Button_margin: {
    justifyContent: "flex-end",
    marginVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  button: {
    backgroundColor: "#4E4EFF",
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: wp('5%'),
  },
});

export default Home;
