import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import GetStarted from "./screens/GetStarted";
import Home from "./screens/Home";
import SplashScreen from "./screens/SplashScreen";
import MainScreen from "./screens/TabScreens/MainScreen";



const RootNavigation = (props) => {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  const transitionConfig = {
    animation: "spring",
    config: {
      stiffness: 500,
      damping: 50,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"getstarted"}
        // initialRouteName={props.initRoute}
        screenOptions={{
          ...screenOptions,
          transitionSpec: {
            open: transitionConfig,
            close: transitionConfig,
          },
        }}
      >
        <Stack.Screen
          name="getstarted"
          component={GetStarted}
          options={{ title: "getstarted" }}
        />
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{ title: "splash" }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />

        <Stack.Screen
          name="main"
          component={MainScreen}
          options={{ title: "main" }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;