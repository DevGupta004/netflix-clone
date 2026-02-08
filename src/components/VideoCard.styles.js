import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#181818",
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSquare: {
    borderRadius: 4,
  },
  cardFocused: {
    borderColor: "#FFF",
    borderWidth: 2,
    transform: [{ scale: 1.05 }],
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    backgroundColor: "#2a2a2a",
  },
  cardPressed: {
    opacity: 0.85,
  },
  thumbnail: {
    width: "100%",
    backgroundColor: "#222",
  },
  meta: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  match: {
    color: "#46d369",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 2,
  },
  title: {
    color: "#e5e5e5",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  genre: {
    color: "#777",
    fontSize: 11,
    marginTop: 2,
  },
});

export default styles;
