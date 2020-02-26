import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  headerBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: winWidth - 30,
    alignItems: "center"
  },
  headerText: {
    color: "pink",
    fontSize: 30,
    fontWeight: "bold"
  },
  homeButton: {
    width: 40,
    height: 40,
    padding: 5,
    paddingHorizontal: 8,
    fontWeight: "bold",
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 5,
    borderWidth: 1
  },
  cameraButton: {
    width: 80,
    paddingHorizontal: 27
  },
  profileButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: winWidth / 2.5
  },
  flagButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1
  },
  levelIndicator: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
