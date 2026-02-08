import React, { useCallback } from "react";
import { Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import YouTubePlayer from "../components/YouTubePlayer";
import styles from "./PlayerScreen.styles";
import useTVDpad from "../hooks/useTVDpad";

export default function PlayerScreen({ navigation, route }) {
  const { videoId, title } = route.params;
  const isTV = Platform.isTV;

  const handleSelect = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const { focusedIndex } = useTVDpad({
    itemCount: 1,
    columns: 1,
    onSelect: handleSelect,
  });

  return (
    <SafeAreaView style={styles.container}>
      {isTV && (
        <View style={styles.backRow}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              styles.backButton,
              isTV && focusedIndex === 0 && styles.backButtonFocused,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.playerWrap}>
        <YouTubePlayer videoId={videoId} />
      </View>
      <View style={styles.meta}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}
