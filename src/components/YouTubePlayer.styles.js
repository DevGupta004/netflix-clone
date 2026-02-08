import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
  },
  webview: {
    flex: 1,
    backgroundColor: "#000",
  },
  iframe: {
    width: "100%",
    height: "100%",
    border: 0,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.85)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  errorTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  errorText: {
    color: "#CFCFCF",
    textAlign: "center",
    marginBottom: 12,
  },
  errorButton: {
    backgroundColor: "#E50914",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
  },
  errorButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },
});

export default styles;
