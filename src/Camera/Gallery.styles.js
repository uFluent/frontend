import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export const styleMaker = (saved, word) =>
  //create consts that align with saved and word that change the look of the save button
  {
    let savedButtonColor = "#F05E23";
    if (saved) savedButtonColor = "rgba(0, 255, 0, 1)";
    if (!word) savedButtonColor = "rgba(255, 0, 0, 1)";
    return StyleSheet.create({
      loadingScreen: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      preview: {
        height: winHeight - 250,
        width: winWidth - 70,
        position: "absolute",
        margin: 35,
        borderWidth: 5,
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
        height: 65,
        width: 65,
        padding: 15,
        paddingLeft: 20,
        marginTop: 5,
        alignItems: "center",
        borderRadius: 45,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        zIndex: 5,
        backgroundColor: savedButtonColor
      },
      cameraButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: 50,
        width: 65,
        borderRadius: 45,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        zIndex: 5,
        backgroundColor: "rgba(0, 0, 150, 0.5)",
        borderRadius: 4
      },
      cameraIcons: { color: "white" },
      lowerText: {
        width: winWidth - 5,
        height: 100,
        top: winHeight - 240,
        backgroundColor: "#E2A4C6",
        zIndex: 10,
        borderRadius: 30,
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
  };
