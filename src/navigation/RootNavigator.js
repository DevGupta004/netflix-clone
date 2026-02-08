import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PlayerScreen from "../screens/PlayerScreen";

const Stack = createNativeStackNavigator();
const isTV = Platform.isTV;

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
        options={{
          headerShown: !isTV,
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#FFF",
          headerTitle: "",
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
