import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export const styleMaker = state => {
  let pictureOpacity = 1;
  if (state.guess !== null) {
    pictureOpacity = 0;
  }

  let feedbackColour = "green";
  if (state.guess === "incorrect") feedbackColour = "red";

  return StyleSheet.create({
    screen: {
      height: winHeight,
      backgroundColor: "lightblue"
    },
    selection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      height: winHeight * 0.9
    },
    title: {},
    pictureContainer: {
      height: 200,
      width: 200,
      position: "relative"
    },
    pictureOverlay: {
      height: 230,
      width: 200,
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between"
    },
    picture: {
      resizeMode: "cover",
      height: 200,
      minWidth: 200,
      opacity: pictureOpacity,
      zIndex: -10,
      position: "absolute",
      borderRadius: 20,
      borderColor: "black",
      borderWidth: 4
    },
    options: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: winWidth,
      height: winHeight * 0.4
    },
    wordOption: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: winWidth / 3,
      height: 40,
      marginTop: 10,
      margin: 20,
      marginLeft: -50
    },
    wordOptionButton: {
      width: winWidth / 3,
      height: 40
    },
    otherGuess: { opacity: 0.5 },
    guessConfirmationText: {
      fontSize: 40,
      color: feedbackColour,
      marginBottom: winHeight / 5,
      zIndex: 50
    },
    guessConfirmationText2: {
      fontSize: 40,
      color: feedbackColour,
      marginBottom: -30
    },
    speakWord: {
      marginLeft: 20,
      width: 40,
      height: 40
    },
    questionContainer: {
      width: winWidth - 10,
      height: winHeight / 4,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    question: {
      color: "white",
      fontSize: 60,
      opacity: pictureOpacity
    },
    pictureOption: {
      width: 144,
      height: 144,
      zIndex: 10,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 20
    },
    correctGuess: {
      borderColor: "green",
      color: "white"
    },
    incorrectGuess: {
      borderColor: "orange",
      color: "white"
    },
    otherGuessPicture: { opacity: 0.2 },
    pictureOptions: {
      width: winWidth,
      height: winHeight * 0.5,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignContent: "space-around",
      alignItems: "center"
    },
    wordOverlay: {
      height: 200,
      width: 200,
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around"
    }
  });
};
