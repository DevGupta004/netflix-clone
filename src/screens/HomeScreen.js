import React, { useCallback, useMemo, useRef } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { VIDEOS } from "../data/videos";
import VideoCard from "../components/VideoCard";
import styles from "./HomeScreen.styles";
import useTVGrid from "../hooks/useTVGrid";

const netflixLogo = require("../assets/netflix-logo.png");

export default function HomeScreen({ navigation, route }) {
  const { width, height } = useWindowDimensions();
  const isTV = Platform.isTV;
  const isMobile = width < 600;
  const scrollRef = useRef(null);
  const railRefs = useRef([]);
  const profile = route?.params?.profile;

  const hero = VIDEOS[0];
  const railItemWidth = useMemo(() => {
    if (isTV) return 260;
    if (width >= 1200) return 240;
    if (width >= 800) return 210;
    return 140;
  }, [isTV, width]);

  const rails = useMemo(
    () => [
      { title: "Continue Watching", data: VIDEOS.slice(0, 5), showTitle: true },
      { title: "Trending Now", data: VIDEOS },
      { title: "Top 10 in India Today", data: VIDEOS.slice(0, 10), isTop10: true },
      { title: "New Releases", data: [...VIDEOS].reverse() },
      { title: "Popular on Netflix", data: [...VIDEOS].sort(() => Math.random() - 0.5) },
      { title: "Watch It Again", data: VIDEOS.slice(3) },
    ],
    []
  );

  // Section layout: [hero buttons, rail0, rail1, ...]
  const sections = useMemo(
    () => [2, ...rails.map((r) => r.data.length)],
    [rails]
  );

  const handleSelect = useCallback(
    ({ section, item }) => {
      if (section === 0) {
        if (item === 0) {
          navigation.navigate("Player", { videoId: hero.id, title: hero.title });
        }
      } else {
        const railIndex = section - 1;
        const video = rails[railIndex]?.data[item];
        if (video) {
          navigation.navigate("Player", { videoId: video.id, title: video.title });
        }
      }
    },
    [navigation, hero, rails]
  );

  const focus = useTVGrid({ sections, onSelect: handleSelect });

  // Auto-scroll rail to focused item on TV
  useMemo(() => {
    if (!isTV) return;
    if (focus.section > 0) {
      const railIdx = focus.section - 1;
      const flatList = railRefs.current[railIdx];
      if (flatList) {
        try {
          flatList.scrollToIndex({
            index: Math.max(0, focus.item - 1),
            animated: true,
            viewPosition: 0,
          });
        } catch (e) {
          // ignore scroll errors
        }
      }
    }
  }, [isTV, focus.section, focus.item]);

  const heroHeight = isTV ? 480 : isMobile ? 450 : 420;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ─── HERO BANNER ─── */}
        <View style={{ height: heroHeight }}>
          <ImageBackground
            source={{ uri: hero.thumbnail }}
            style={styles.hero}
            imageStyle={styles.heroImage}
          >
            {/* Top bar overlaid on hero */}
            <View style={[styles.topBar, isMobile && styles.topBarMobile]}>
              <View style={styles.brandRow}>
                <Image source={netflixLogo} style={styles.brandLogo} resizeMode="contain" />
                {!isMobile ? (
                  <View style={styles.topNav}>
                    <Text style={[styles.topLink, styles.topLinkActive]}>Home</Text>
                    <Text style={styles.topLink}>TV Shows</Text>
                    <Text style={styles.topLink}>Movies</Text>
                    <Text style={styles.topLink}>New & Popular</Text>
                    <Text style={styles.topLink}>My List</Text>
                  </View>
                ) : null}
                {profile ? (
                  <View style={styles.profileBadge}>
                    <Text style={styles.profileBadgeText}>{profile.name?.charAt(0)}</Text>
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

            {/* Bottom gradient */}
            <View style={styles.heroGradientTop} />
            <View style={styles.heroGradient} />

            {/* Hero content */}
            <View style={styles.heroContent}>
              <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile]} numberOfLines={2}>
                {hero.title}
              </Text>
              <Text style={styles.heroGenre}>{hero.genre}</Text>
              <View style={styles.heroActions}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Player", { videoId: hero.id, title: hero.title })
                  }
                  style={({ pressed }) => [
                    styles.playButton,
                    isTV && focus.section === 0 && focus.item === 0 && styles.buttonFocused,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.playText}>▶  Play</Text>
                </Pressable>
                <Pressable
                  onPress={() => {}}
                  style={({ pressed }) => [
                    styles.infoButton,
                    isTV && focus.section === 0 && focus.item === 1 && styles.buttonFocused,
                    pressed && styles.buttonPressed,
                  ]}
                >
                  <Text style={styles.infoText}>ⓘ  My List</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* ─── CONTENT RAILS ─── */}
        {rails.map((rail, railIndex) => {
          const sectionIndex = railIndex + 1;

          return (
            <View key={rail.title} style={styles.rail}>
              <Text style={styles.railTitle}>{rail.title}</Text>
              <FlatList
                ref={(ref) => {
                  railRefs.current[railIndex] = ref;
                }}
                data={rail.data}
                keyExtractor={(item, index) => `${rail.title}-${item.id}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.railContent}
                onScrollToIndexFailed={() => {}}
                renderItem={({ item, index }) => {
                  const focused =
                    isTV && focus.section === sectionIndex && focus.item === index;

                  if (rail.isTop10) {
                    return (
                      <Pressable
                        key={`${rail.title}-${item.id}-${index}`}
                        onPress={() =>
                          navigation.navigate("Player", { videoId: item.id, title: item.title })
                        }
                        style={({ pressed }) => [
                          styles.top10Item,
                          { width: railItemWidth + 40 },
                          focused && styles.top10Focused,
                          pressed && styles.cardPressed,
                        ]}
                      >
                        <Text style={styles.top10Number}>{index + 1}</Text>
                        <Image
                          source={{ uri: item.thumbnail }}
                          style={styles.top10Image}
                        />
                      </Pressable>
                    );
                  }

                  return (
                    <View style={[styles.railItem, { width: railItemWidth }]}>
                      <VideoCard
                        item={item}
                        isFocused={focused}
                        showTitle={rail.showTitle}
                        onPress={(video) =>
                          navigation.navigate("Player", { videoId: video.id, title: video.title })
                        }
                      />
                    </View>
                  );
                }}
              />
            </View>
          );
        })}

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Netflix Clone Demo</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
