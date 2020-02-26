import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#bff199",
    height: winHeight * 0.7
  },
  languageContainer: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300
  },
  imageProfile: {
    width: 250,
    height: 250,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 60,
    borderColor: "white",
    borderWidth: 7
  },
  sections: {
    margin: 10,
    width: 325,
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 2,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255,159,157)"
  },
  levelBar: {
    backgroundColor: "lightgreen",
    borderRadius: 22,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: 61,
    zIndex: -1,
    position: "absolute",
    alignSelf: "flex-start"
  },
  text: { fontSize: 40, padding: 30, color: "black" },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  cell: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth
  },
  scrollView: {
    flex: 1
  },
  contentContainer: {
    height: 500,
    paddingVertical: 100,
    paddingLeft: 20
  },
  textButton: {
    color: "deepskyblue",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "deepskyblue",
    margin: 2
  },

  dropdown_2: {
    width: 120,
    height: 65,
    left: 0,
    borderWidth: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "rgb(255,66,66)",
    borderColor: "#ffb3ba",
    borderWidth: 1,
    justifyContent: "center"
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center"
  },
  dropdown_2_dropdown: {
    width: 150,
    height: 180,
    borderColor: "cornflowerblue",
    borderWidth: 2,
    borderRadius: 3
  },
  dropdown_2_row: {
    flexDirection: "row",
    height: 40,
    alignItems: "center"
  },
  dropdown_2_image: {
    marginLeft: 4,
    width: 30,
    height: 30
  },
  dropdown_2_row_text: {
    marginHorizontal: 4,
    fontSize: 16,
    color: "navy",
    textAlignVertical: "center"
  },
  dropdown_2_separator: {
    height: 1,
    backgroundColor: "cornflowerblue"
  }
});
