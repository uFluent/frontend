import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});
