import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#bae1ff"
  },
  languageContainer: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  imageProfile: {
    width: 210,
    height: 210,
    marginTop: 40,
    borderRadius: 60,
    borderColor: "#ffb3ba",
    borderWidth: 4
  },
  sections: {
    margin: 10,
    width: 300,
    borderRadius: 25,
    borderColor: "#ffb3ba",
    borderWidth: 2,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffba"
  },
  text: { fontSize: 40, padding: 30 },
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
    left: 52,
    borderWidth: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "#ffb3ba",
    borderColor: "#ffb3ba",
    borderWidth: 1,
    justifyContent: "center"
  },
  dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: "black",
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
