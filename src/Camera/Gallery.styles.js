import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  preview: {
    height: winHeight - 250,
    width: winWidth - 70,
    position: "absolute",
    margin: 35,
    borderWidth: 3,
    borderColor: "yellow",
    left: 0,
    top: 20,
    right: 0,
    bottom: 0,
    zIndex: -5
  },
  topButtons: {
    width: winWidth,
    height: 50,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  saveButton: {
    height: 50,
    width: 100,
    color: "white",
    padding: 10,
    paddingLeft: 14,
    zIndex: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  cameraButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50,
    width: 100,
    zIndex: 5,
    backgroundColor: "rgba(0, 0, 150, 0.5)",
    borderRadius: 4
  },
  cameraIcons: { color: "white" },
  lowerText: {
    width: winWidth,
    height: 100,
    top: winHeight - 240,
    backgroundColor: "green",
    zIndex: 10,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row"
  },
  bigText: {
    fontSize: 60
  },
  speakButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
