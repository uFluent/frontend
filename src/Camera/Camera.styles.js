import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  preview: {
    height: winHeight - 180,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 20,
    right: 0,
    bottom: 0
  },
  background: {
    backgroundColor: "#f4511e",
    height: winHeight,
    width: winWidth
  },
  alignCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomToolbar: {
    width: winWidth,
    position: "absolute",
    height: winHeight,
    bottom: 0
  },
  captureBtn: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 0,
    borderColor: "#FFFFFF"
  },
  captureBtnActive: {
    width: 80,
    height: 80
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: "red",
    borderColor: "transparent"
  },
  galleryContainer: {
    bottom: 100
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5
  },
  galleryImage: {
    width: 75,
    height: 75
  }
});
