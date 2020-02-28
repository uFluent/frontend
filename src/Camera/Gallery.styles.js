import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export const styleMaker = (saved, word) => {
  let savedButtonColor = "white";
  if (saved) savedButtonColor = "rgb(253,1,23)";
  if (!word) savedButtonColor = "rgb(255, 0, 0)";
  return StyleSheet.create({
    loadingScreen: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    preview: {
      height: winHeight - 240,
      width: winWidth - 55,
      position: "absolute",
      margin: 30,
      borderWidth: 8,
      borderRadius: 20,
      borderColor: "white",
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
      backgroundColor: "purple",
      color: savedButtonColor,
      height: 58,
      width: 65,
      paddingTop: 15,
      paddingLeft: 20,
      marginTop: 5,
      alignItems: "center",
      borderRadius: 30,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      zIndex: 5
    },
    cameraButton: {
      backgroundColor: "purple",
      color: savedButtonColor,
      height: 58,
      width: 65,
      paddingTop: 15,
      paddingRight: 10,
      marginTop: 5,
      alignItems: "center",
      borderRadius: 30,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      zIndex: 5
    },
    cameraIcons: {
      color: "white"
    },
    lowerText: {
      width: winWidth,
      height: 130,
      top: winHeight - 260,
      backgroundColor: "rgb(250,224,6)",
      zIndex: -10,
      borderColor: "white",
      borderTopWidth: 10,
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

      display: "flex",
      alignItems: "center",
      justifyContent: "space-around"
    }
  });
};
