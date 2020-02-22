import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4511e"
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
  }
});
