import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import YouTubePlayer from "../components/YouTubePlayer";

export default function PlayerScreen({ route }) {
  const { videoId, title } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.playerWrap}>
        <YouTubePlayer videoId={videoId} />
      </View>
      <View style={styles.meta}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  playerWrap: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  meta: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
