# Netflix Clone Starter (React Native)

Minimal, cross-platform OTT foundation focused on YouTube playback for:
- Android (mobile)
- iOS
- Web
- Android TV

## Architecture Overview
- `src/App.js`: app entry, theme bootstrap, root navigator
- `src/navigation/RootNavigator.js`: stack navigation (Home -> Player)
- `src/screens/HomeScreen.js`: grid/list of videos
- `src/screens/PlayerScreen.js`: YouTube playback surface
- `src/components/VideoCard.js`: poster + title tile (focusable)
- `src/components/YouTubePlayer.js`: platform-specific player wrapper
- `src/data/videos.js`: static sample catalog (replace with API later)

## Why WebView for YouTube
YouTube's native SDKs do not have a unified React Native story across
mobile, web, and Android TV. The WebView/iFrame embed is the most stable,
supported, and consistent approach for initial OTT foundations.

## Platform Notes
- Android/iOS: `react-native-webview` renders the YouTube embed
- Web: native `<iframe>` embed
- Android TV: focusable tiles using `TouchableOpacity` + `Platform.isTV`

## Run (mobile)
This repository is intentionally minimal; wire it into your RN CLI project:
1. `yarn add` the dependencies listed in `package.json`
2. Copy `src/` and `index.js` into your RN app (or use this folder as the app)
3. Run with `react-native run-android` / `react-native run-ios`

## Run (web)
Use any RN web solution (Expo, Next.js, or webpack). This code is already
`react-native-web` compatible; the `YouTubePlayer` renders an `<iframe>` on web.

## Android TV Basics
Enable TV in your Android manifest and leanback launcher:
- `android.software.leanback` feature
- `android.intent.category.LEANBACK_LAUNCHER`

## Next Steps (future)
- Replace `src/data/videos.js` with an API
- Add rails / rows for OTT layouts
- Add analytics and error tracking
- Add TV-specific focus guides and spatial nav
