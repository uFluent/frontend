import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    backgroundColor: "#FFFFCF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loginContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-start"
  },

  login: {
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    width: 230,
    backgroundColor: "#D9FFDF",
    color: "black",
    borderRadius: 25,
    padding: 15,
    borderWidth: 1
  },

  textInput: {
    fontSize: 15,
    width: 150,
    color: "black"
  },

  textInput2: {
    fontSize: 40,
    width: 200,
    color: "black"
  },
  whichPageText: {
    width: 150,
    height: 150,
    paddingBottom: 100
  },
  buttonStyle: {
    backgroundColor: "#ffb3ba",
    width: 70,
    height: 50,
    paddingRight: 15,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderWidth: 1
  },
  toggleText: {
    color: "grey",
    paddingTop: 35
  }
});
