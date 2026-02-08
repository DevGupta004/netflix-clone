import React, { useCallback } from "react";
import { SafeAreaView, View, Text, Image, Pressable, Platform } from "react-native";
import styles from "./ProfileScreen.styles";
import useTVDpad from "../hooks/useTVDpad";

const netflixLogo = require("../assets/netflix-logo.png");

const PROFILES = [
  { id: "1", name: "Karan", color: "#e50914" },
  { id: "2", name: "Dev", color: "#141414" },
  { id: "3", name: "Ritik", color: "#4b9bff" },
];

export default function ProfileScreen({ navigation }) {
  const isTV = Platform.isTV;

  const handleSelect = useCallback(
    (index) => {
      const profile = PROFILES[index];
      if (profile) navigation.replace("Home", { profile });
    },
    [navigation]
  );

  const { focusedIndex } = useTVDpad({
    itemCount: PROFILES.length,
    columns: PROFILES.length,
    onSelect: handleSelect,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image source={netflixLogo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Who's watching?</Text>
      <View style={styles.grid}>
        {PROFILES.map((item, index) => {
          const isFocused = isTV && focusedIndex === index;

          return (
            <Pressable
              key={item.id}
              onPress={() => handleSelect(index)}
              style={({ pressed }) => [
                styles.profileCard,
                isFocused && styles.profileCardFocused,
                pressed && styles.profileCardPressed,
              ]}
            >
              <View style={[styles.avatar, { backgroundColor: item.color }]}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <Text
                style={[
                  styles.profileName,
                  isFocused && styles.profileNameFocused,
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
