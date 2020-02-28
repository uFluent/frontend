import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth - 15,
    position: "relative",
    left: 8,
    top: 25,
    right: 10,
    borderRadius: 10,
    bottom: 0,
    backgroundColor: "#F0F6F0"
  },
  cameraStyle: {
    height: winHeight - 180,
    width: winWidth - 35,
    position: "relative",
    left: 10,
    top: 10,
    right: 10,
    bottom: 0,
    zIndex: 1,
    backgroundColor: "rgb(250,224,6)"
  },

  background: {
    backgroundColor: "rgb(0, 157, 237)", //"rgb(250,224,6)",
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
    width: 175,
    height: 80,
    marginTop: 40,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "#D04427",
    backgroundColor: "#F7C026", /// "rgb(255,128,0)",
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
  captureBtnInternal: {},
  cameraIcon: {
    color: "rgb(250,224,6)"
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
