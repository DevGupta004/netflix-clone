import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  backButtonFocused: {
    borderColor: "#FFF",
    backgroundColor: "rgba(255,255,255,0.2)",
    transform: [{ scale: 1.05 }],
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
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

export default styles;
