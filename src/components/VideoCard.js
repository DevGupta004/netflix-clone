import React, { useMemo } from "react";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./VideoCard.styles";

export default function VideoCard({
  item,
  onPress,
  isFocused = false,
  showTitle = false,
  variant = "poster",
  style,
  imageStyle,
  titleStyle,
}) {
  const ratio = useMemo(() => (variant === "square" ? 1 : 16 / 9), [variant]);

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        styles.card,
        variant === "square" && styles.cardSquare,
        isFocused && styles.cardFocused,
        pressed && styles.cardPressed,
        style,
      ]}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={[styles.thumbnail, { aspectRatio: ratio }, imageStyle]}
      />
      {(showTitle || isFocused) && (
        <View style={styles.meta}>
          {item.match && isFocused ? (
            <Text style={styles.match}>{item.match} Match</Text>
          ) : null}
          <Text numberOfLines={1} style={[styles.title, titleStyle]}>
            {item.title}
          </Text>
          {item.genre && isFocused ? (
            <Text numberOfLines={1} style={styles.genre}>
              {item.genre}
            </Text>
          ) : null}
        </View>
      )}
    </Pressable>
  );
}
