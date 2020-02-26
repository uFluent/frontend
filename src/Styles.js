import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    flexDirection: "column-reverse"
  },
  logoText: {
    fontSize: 70,
    color: "green"
  },
  homepageButton: {
    padding: 10,
    borderColor: "black",
    width: 90,
    height: 90
  },
  loadingScreen: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: winHeight,
    width: winWidth,
    backgroundColor: "#ace8dc"
  }
});
