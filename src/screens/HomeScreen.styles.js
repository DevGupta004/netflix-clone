import { Platform, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /* ─── LAYOUT ─── */
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  content: {
    paddingBottom: 40,
  },

  /* ─── TOP BAR (overlaid on hero) ─── */
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 8 : 8,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topBarMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    flex: 1,
  },
  brand: {
    color: "#E50914",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 2,
  },
  brandLogo: {
    width: 28,
    height: 28,
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  topNavMobile: {
    paddingHorizontal: 2,
    gap: 18,
  },
  topLink: {
    color: "#e5e5e5",
    fontSize: 14,
    fontWeight: "500",
  },
  topLinkActive: {
    color: "#FFF",
    fontWeight: "700",
  },
  profileBadge: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: "#E50914",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  profileBadgeText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "700",
  },

  /* ─── HERO BANNER ─── */
  hero: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#000",
  },
  heroImage: {
    resizeMode: "cover",
  },
  heroGradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "transparent",
    // Simulated top gradient for nav readability
    opacity: 0.6,
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "#141414",
    opacity: 0.85,
  },
  heroContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 5,
  },
  heroTitle: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "800",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  heroTitleMobile: {
    fontSize: 26,
  },
  heroGenre: {
    color: "#a3a3a3",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 6,
    letterSpacing: 0.3,
  },
  heroActions: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },

  /* ─── BUTTONS ─── */
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 4,
    gap: 6,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  playText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  infoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(109, 109, 110, 0.7)",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 4,
    gap: 6,
    borderWidth: 2,
    borderColor: "transparent",
  },
  infoText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonFocused: {
    borderColor: "#FFF",
    transform: [{ scale: 1.08 }],
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.75,
  },

  /* ─── RAILS ─── */
  rail: {
    marginTop: 24,
  },
  railTitle: {
    color: "#e5e5e5",
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 20,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  railContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  railItem: {
    paddingVertical: 4,
  },

  /* ─── TOP 10 RAIL ─── */
  top10Item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 8,
  },
  top10Number: {
    color: "#FFF",
    fontSize: 72,
    fontWeight: "900",
    fontStyle: "italic",
    width: 60,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    // Stroke effect simulation
    letterSpacing: -4,
  },
  top10Image: {
    flex: 1,
    height: 140,
    borderRadius: 6,
    backgroundColor: "#222",
  },
  top10Focused: {
    borderColor: "#FFF",
    transform: [{ scale: 1.05 }],
  },
  cardPressed: {
    opacity: 0.85,
  },

  /* ─── FOOTER ─── */
  footer: {
    marginTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#555",
    fontSize: 12,
  },
});

export default styles;
