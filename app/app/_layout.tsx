import { SplashScreen, Stack } from "expo-router";
import React from "react";

import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "HankenGrotesk-Bold": require("../assets/fonts/HankenGrotesk-Bold.ttf"),
    "HankenGrotesk-ExtraBold": require("../assets/fonts/HankenGrotesk-ExtraBold.ttf"),
    "HankenGrotesk-Light": require("../assets/fonts/HankenGrotesk-Light.ttf"),
    "HankenGrotesk-Medium": require("../assets/fonts/HankenGrotesk-Medium.ttf"),
    "HankenGrotesk-Regular": require("../assets/fonts/HankenGrotesk-Regular.ttf"),
    "HankenGrotesk-SemiBold": require("../assets/fonts/HankenGrotesk-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <>
      {fontsLoaded && <Stack screenOptions={{ headerShown: false }} />}
      <StatusBar hidden={false} barStyle={"dark-content"} />
    </>
  );
}
