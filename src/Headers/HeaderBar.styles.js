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
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  homeButton: {
    color: "white",
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
    backgroundColor: "white",
    color: "#f4511e",
    width: 80,
    height: 40,
    padding: 5,
    paddingHorizontal: 27,
    fontWeight: "bold",
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 5,
    borderWidth: 1
  }
});
