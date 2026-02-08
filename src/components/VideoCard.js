import React, { useMemo, useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

export default function VideoCard({
  item,
  onPress,
  isFirst,
  showTitle = false,
  variant = "poster",
  style,
  imageStyle,
  titleStyle,
}) {
  const [focused, setFocused] = useState(false);
  const isTV = Platform.isTV;
  const ratio = useMemo(() => (variant === "square" ? 1 : 16 / 9), [variant]);

  return (
    <Pressable
      onPress={() => onPress(item)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      focusable={isTV}
      hasTVPreferredFocus={isTV && isFirst}
      style={({ pressed }) => [
        styles.card,
        variant === "square" && styles.cardSquare,
        focused && styles.cardFocused,
        pressed && styles.cardPressed,
        style,
      ]}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={[styles.thumbnail, { aspectRatio: ratio }, imageStyle]}
      />
      {showTitle ? (
        <View style={styles.meta}>
          <Text numberOfLines={1} style={[styles.title, titleStyle]}>
            {item.title}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#151515",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#151515",
  },
  cardSquare: {
    borderRadius: 6,
  },
  cardFocused: {
    borderColor: "#E50914",
    transform: [{ scale: 1.04 }],
  },
  cardPressed: {
    opacity: 0.9,
  },
  thumbnail: {
    width: "100%",
    backgroundColor: "#222",
  },
  meta: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  title: {
    color: "#E6E6E6",
    fontSize: 12,
    lineHeight: 16,
  },
});
