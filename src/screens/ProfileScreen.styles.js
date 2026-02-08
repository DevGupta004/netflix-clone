import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 24,
  },
  title: {
    color: "#e5e5e5",
    fontSize: 28,
    fontWeight: "400",
    marginBottom: 36,
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  profileCard: {
    width: 130,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "transparent",
  },
  profileCardFocused: {
    borderColor: "#FFF",
    backgroundColor: "rgba(255,255,255,0.06)",
    transform: [{ scale: 1.1 }],
  },
  profileCardPressed: {
    opacity: 0.75,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
  },
  profileName: {
    color: "#808080",
    fontSize: 15,
    fontWeight: "500",
  },
  profileNameFocused: {
    color: "#FFF",
    fontWeight: "600",
  },
});

export default styles;
