import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  screen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: winHeight * 0.8
  },
  title: {},
  picture: {
    resizeMode: "cover",
    height: 200,
    width: 200
  },
  wordOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: winWidth / 3,
    height: 40,
    backgroundColor: "grey",
    marginTop: 10
  },
  speakWord: {
    backgroundColor: "orange",
    width: 30,
    height: 30
  },
  options: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: winWidth,
    height: winHeight * 0.3
  }
});
