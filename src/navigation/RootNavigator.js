import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PlayerScreen from "../screens/PlayerScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Profiles"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Profiles"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Player"
        component={PlayerScreen}
      />
    </Stack.Navigator>
  );
}
