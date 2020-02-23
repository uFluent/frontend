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
    minWidth: 200
  },
  options: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: winWidth,
    height: winHeight * 0.3
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
  correctGuess: {
    backgroundColor: "green"
  },
  incorrectGuess: {
    opacity: 0.5
  },
  speakWord: {
    backgroundColor: "orange",
    width: 30,
    height: 30
  }
});
