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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      height: winHeight * 0.8
    },
    title: {},
    pictureContainer: {
      height: 200,
      width: 200,
      position: "relative"
    },
    pictureOverlay: {
      height: 200,
      width: 200,
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around"
    },
    picture: {
      resizeMode: "cover",
      height: 200,
      minWidth: 200,
      opacity: pictureOpacity,
      zIndex: -10,
      position: "absolute"
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
    wordOptionButton: {
      width: winWidth / 3,
      height: 40
    },
    correctGuess: {
      backgroundColor: "green"
    },
    incorrectGuess: {
      backgroundColor: "orange"
    },
    otherGuess: { opacity: 0.5 },
    guessConfirmationText: {
      fontSize: 40,
      color: feedbackColour
    },
    speakWord: {
      marginLeft: 20,
      backgroundColor: "orange",
      width: 40,
      height: 40
    },
    questionContainer: {
      width: winWidth - 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    question: {
      color: "black",
      fontSize: 60,
      opacity: pictureOpacity
    },
    pictureOption: {
      width: 140,
      height: 140,
      backgroundColor: "green",
      zIndex: 10
    },
    pictureOptions: {
      backgroundColor: "blue",
      width: winWidth,
      height: winHeight * 0.5,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignContent: "space-between",
      alignItems: "center"
    }
  });
};
