import React, { useMemo, useState } from "react";
import { Linking, Platform, Pressable, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import styles from "./YouTubePlayer.styles";

export default function YouTubePlayer({ videoId }) {
  const [errorCode, setErrorCode] = useState(null);
  const [mode, setMode] = useState("embed");
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&autoplay=1&rel=0&modestbranding=1&controls=1&fs=1&enablejsapi=1&origin=https://www.youtube.com`;
  const watchUrl = `https://m.youtube.com/watch?v=${videoId}&play=1`;
  const html = useMemo(
    () => `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <style>
      html, body { margin: 0; padding: 0; background: #000; }
      #player { position: absolute; inset: 0; }
    </style>
  </head>
  <body>
    <div id="player"></div>
    <script src="https://www.youtube.com/iframe_api"></script>
    <script>
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          width: '100%',
          height: '100%',
          videoId: '${videoId}',
          playerVars: {
            playsinline: 1,
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            controls: 1,
            fs: 1,
            origin: 'https://www.youtube.com'
          },
          events: {
            onError: function(event) {
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ytError', code: event.data }));
              }
            }
          }
        });
      }
    </script>
  </body>
</html>`,
    [videoId]
  );

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "ytError") {
        setErrorCode(data.code);
        setMode("watch");
      }
    } catch (err) {
      // ignore non-JSON messages
    }
  };

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        {React.createElement("iframe", {
          src: embedUrl,
          style: styles.iframe,
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true,
          title: "YouTube Player",
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={
          mode === "embed"
            ? { html, baseUrl: "https://www.youtube.com" }
            : { uri: watchUrl }
        }
        originWhitelist={[
          "https://www.youtube.com",
          "https://*.youtube.com",
          "https://www.youtube-nocookie.com",
          "https://*.youtube-nocookie.com",
          "https://m.youtube.com",
        ]}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        thirdPartyCookiesEnabled
        sharedCookiesEnabled
        onLoad={() => setErrorCode(null)}
        userAgent="Mozilla/5.0 (Linux; Android 12; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        onMessage={handleMessage}
        style={styles.webview}
      />
      {errorCode ? (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorTitle}>Playback unavailable</Text>
          <Text style={styles.errorText}>
            This video can’t be played in an embedded player (error {errorCode}).
          </Text>
          <Pressable
            focusable
            style={({ pressed }) => [
              styles.errorButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`)}
          >
            <Text style={styles.errorButtonText}>Open in YouTube</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

