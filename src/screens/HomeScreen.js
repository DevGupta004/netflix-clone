import React, { useMemo } from "react";
import {
  FlatList,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { VIDEOS } from "../data/videos";
import VideoCard from "../components/VideoCard";

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isTV = Platform.isTV;
  const isMobile = width < 600;

  const hero = VIDEOS[0];
  const railItemWidth = useMemo(() => {
    if (isTV) return 260;
    if (width >= 1200) return 240;
    if (width >= 800) return 210;
    return 180;
  }, [isTV, width]);

  const rails = useMemo(
    () => [
      { title: "Trending Now", data: VIDEOS },
      { title: "Top Picks", data: [...VIDEOS].reverse() },
      { title: "Because You Watched", data: [...VIDEOS, ...VIDEOS] },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.topBar, isMobile && styles.topBarMobile]}>
          <View style={styles.brandRow}>
            <Text style={styles.brand}>NETFLIX</Text>
            {!isMobile ? (
              <View style={styles.topNav}>
                <Text style={[styles.topLink, styles.topLinkActive]}>Home</Text>
                <Text style={styles.topLink}>TV Shows</Text>
                <Text style={styles.topLink}>Movies</Text>
                <Text style={styles.topLink}>My List</Text>
              </View>
            ) : null}
          </View>
          {isMobile ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topNavMobile}
            >
              <Text style={[styles.topLink, styles.topLinkActive]}>Home</Text>
              <Text style={styles.topLink}>TV Shows</Text>
              <Text style={styles.topLink}>Movies</Text>
              <Text style={styles.topLink}>My List</Text>
            </ScrollView>
          ) : null}
        </View>

        <ImageBackground source={{ uri: hero.thumbnail }} style={styles.hero} imageStyle={styles.heroImage}>
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle} numberOfLines={2}>
              {hero.title}
            </Text>
            <View style={styles.heroActions}>
              <Pressable
                style={styles.playButton}
                onPress={() => navigation.navigate("Player", { videoId: hero.id, title: hero.title })}
              >
                <Text style={styles.playText}>Play</Text>
              </Pressable>
              <Pressable style={styles.infoButton}>
                <Text style={styles.infoText}>More Info</Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        {rails.map((rail, railIndex) => (
          <View key={rail.title} style={styles.rail}>
            <Text style={styles.railTitle}>{rail.title}</Text>
            <FlatList
              data={rail.data}
              keyExtractor={(item, index) => `${rail.title}-${item.id}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.railContent}
              renderItem={({ item, index }) => (
                <View style={[styles.railItem, { width: railItemWidth }]}>
                  <VideoCard
                    item={item}
                    isFirst={railIndex === 0 && index === 0}
                    onPress={(video) =>
                      navigation.navigate("Player", { videoId: video.id, title: video.title })
                    }
                  />
                </View>
              )}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    paddingBottom: 32,
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 6 : 6,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  topBarMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  brand: {
    color: "#E50914",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 0.6,
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  topNavMobile: {
    paddingHorizontal: 2,
    gap: 16,
  },
  topLink: {
    color: "#CFCFCF",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  topLinkActive: {
    color: "#FFF",
  },
  hero: {
    height: 360,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "flex-end",
    backgroundColor: "#111",
  },
  heroImage: {
    resizeMode: "cover",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroContent: {
    padding: 16,
  },
  heroTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },
  heroActions: {
    marginTop: 12,
    flexDirection: "row",
    gap: 12,
  },
  playButton: {
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
  },
  playText: {
    color: "#000",
    fontWeight: "700",
  },
  infoButton: {
    backgroundColor: "rgba(109, 109, 110, 0.7)",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
  },
  infoText: {
    color: "#FFF",
    fontWeight: "600",
  },
  rail: {
    marginTop: 20,
  },
  railTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  railContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  railItem: {
    paddingVertical: 4,
  },
});
