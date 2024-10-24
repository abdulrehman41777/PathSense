// OnboardingScreen.js
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated, Dimensions, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Tts from 'react-native-tts';
import Paginator from './Paginator';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: "WELCOME TO Path Sense",
    description: 'An Application designed to empower the visually impaired community in exploring the world with unprecedented independence.',
    image: require('../../assets/bannerscreen1.png'),
  },
  {
    id: '2',
    title: "WELCOME TO Path Sense",
    description: 'Our app serves as a reliable companion, utilizing cutting-edge technology to assist blind individuals in identifying objects, recognizing colors, and navigating their surroundings with ease.',
    image: require('../../assets/bannerscreen2.png'),
  },
  {
    id: '3',
    title: "WELCOME TO Path Sense",
    description: 'With integrated Siri functionality, users can effortlessly navigate through the app using voice commands, allowing for a seamless and hands-free experience.',
    image: require('../../assets/bannerscreen3.png'),
  },
];

// Tts.setDefaultRate(0.5); // Set the speech rate
// Tts.setDefaultPitch(1.0);

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const speakText = async (text) => {
    try {
      await Tts.speak(text, { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 0.5, KEY_PARAM_STREAM: 'STREAM_MUSIC' } });
    } catch (error) {
      console.error('TTS error:', error);
    }
  };

  const handleNext = () => {
    if (slidesRef.current && currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Navigate to the next screen or perform any other action
      navigation.navigate('Home');
    }
  };

  const handleSpeech = () => {
    const currentSlide = slides[currentIndex];
    const fullText = `${currentSlide.title}. ${currentSlide.description}`;
    speakText(fullText);
  };

  useEffect(() => {
    // Reset the onboarding when the screen is focused again
    if (isFocused) {
      setCurrentIndex(0);
      if (slidesRef.current) {
        slidesRef.current.scrollToIndex({ index: 0 });
      }

      // Initialize TTS
      Tts.getInitStatus().then((initStatus) => {
        if (initStatus !== Tts.RESULTS.Good) {
          Tts.requestInstallEngine();
          console.log(initStatus);
        }


        // Speak text when the component mounts or the screen is focused
        handleSpeech();
      });
    }
  }, [isFocused]);


  useEffect(() => {
    // Speak text when the current index changes
    handleSpeech();
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNext} style={styles.touchableArea}>
        <ImageBackground
          source={slides[currentIndex].image}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={styles.contentContainer}>
              <FlatList
                ref={slidesRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={{ width, height }}></View>
                )}
              />
              <View style={styles.whiteBox}>
                <Text style={styles.title}>{slides[currentIndex].title}</Text>
                <Text style={styles.description}>{slides[currentIndex].description}</Text>
                <View style={{ marginTop: 40, marginBottom: 30 }}>
                  <Paginator data={slides} scrollX={scrollX} currentIndex={currentIndex} />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  whiteBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    width: '100%',
    paddingVertical: 50,
    alignItems: 'center',
  },
  description: {
    marginVertical: 10,
    fontSize: 17,
    color: 'gray',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    color: '#ffff',
    textAlign: 'center',
    fontWeight: "900"
  },
});

export default OnboardingScreen;
