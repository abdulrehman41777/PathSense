import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const GetStarted = ({ navigation }) => {

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);


  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 100);
    setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 300);

    setTimeout(() => navigation.navigate('Home'), 5500)
  }, [])


  return (
    <View style={styles.main_container}>
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View style={{ ...styles.main_circle, padding: ring2padding }}>
        <Animated.View style={{ ...styles.secondary_circle, padding: ring1padding }}>
          <Image source={require('../assets/logohead.png')}
            style={{ width: hp(29), height: hp(29) }} />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={styles.title}>
        <Text style={styles.Heading_main}>
          Path Sense
        </Text>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical: 10,
  },
  status_bar: {
    backgroundColor: "#0443fb59"
  },
  main_circle: {
    backgroundColor: "#ffffff12",
    borderRadius: hp(100),
    padding: hp(7),
  },
  secondary_circle: {
    backgroundColor: "#ffffff12",
    borderRadius: hp(100),
    padding: hp(6),
  },
  image_Size: {
    width: hp(20),
    height: hp(20),
    borderRadius: hp(100),
  },
  title: {
    flex: 0,
    alignItems: "center",
    padding: hp(2),
  },
  Heading_main: {
    fontSize: hp(9),
    fontWeight: "700",
    color: "#fff",
  },
});

export default GetStarted;