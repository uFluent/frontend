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
    backgroundColor: "#FFDF00",
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
    height: 170,
    bottom: 0
  },
  captureBtn: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#7bc043",
    backgroundColor: "rgb(43, 128, 62)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  captureBtnActive: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "rgb(43, 128, 62)",
    backgroundColor: "rgb(0, 210, 46)"
  },
  captureBtnInternal: {
    // width: 76,
    // height: 76,
    // borderWidth: 2,
    // borderRadius: 76,
    // backgroundColor: "red",
    // borderColor: "transparent"
  },
  cameraIcon: {
    color: "rgb(0, 210, 46)"
  },
  cameraIconActive: { color: "rgb(43, 128, 62)" },
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
