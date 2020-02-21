import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from "react-native";

// import ModalDropdown from 'react-native-modal-dropdown';
import ModalDropdown from "react-native-modal-dropdown";

const DEMO_OPTIONS_1 = ["option 1", "option 2", "option 3", "option 4"];
const DEMO_OPTIONS_2 = [
  { country: "English", code: "en" },
  { country: "Spanish", code: "es" },
  { country: "French", code: "fr" },
  { country: "Norwegian", code: "no" }
];

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdown_4_options: null,
      dropdown_4_defaultValue: "loading...",
      dropdown_6_icon_heart: true,
      DisplayFlag: {
        fr: require(`./Flags/fr.png`),
        es: require(`./Flags/es.png`),
        en: require(`./Flags/en.png`),
        no: require(`./Flags/no.png`)
      },
      userData: {
        username: "bob123",
        avatarUrl: "https://picsum.photos/id/237/200/300",
        language: "fr",
        score: 100,
        imageCount: 3
      }
    };
  }

  componentDidMount() {
    this.setState({ userData: this.props.route.params.userData });
  }
  render() {
    const { DisplayFlag, userData } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: userData.avatarUrl }}
          style={{ width: 150, height: 150 }}
        />
        <Text>{userData.username}</Text>
        <Text>Language: {this.displayCountry()}</Text>

        <TouchableOpacity onPress={() => alert("image clicked")}>
          <Image
            source={DisplayFlag[userData.language]}
            style={{ width: 75, height: 50 }}
          />
        </TouchableOpacity>
        <ModalDropdown
          ref="dropdown_2"
          style={styles.dropdown_2}
          textStyle={styles.dropdown_2_text}
          dropdownStyle={styles.dropdown_2_dropdown}
          options={DEMO_OPTIONS_2}
          defaultValue={this.displayCountry()}
          renderButtonText={rowData =>
            this._dropdown_2_renderButtonText(rowData)
          }
          renderRow={this._dropdown_2_renderRow.bind(this)}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
            this._dropdown_2_renderSeparator(
              sectionID,
              rowID,
              adjacentRowHighlighted
            )
          }
        ></ModalDropdown>

        <Text>Score: {userData.score}</Text>
        <Text>{this.state.userData.language}</Text>
      </View>
    );
  }

  displayCountry = () => {
    const { userData } = this.state;
    if (userData.language === "fr") return "French";
    if (userData.language === "no") return "Norwegian";
    if (userData.language === "en") return "English";
    if (userData.language === "es") return "Spanish";
    return "error";
  };

  _dropdown_2_renderButtonText(rowData) {
    const { country, code } = rowData;
    this.setState(
      {
        userData: { ...this.state.userData, language: code }
      },
      () => {
        this.props.route.params.setLanguage(this.state.userData.language);
      }
    );
    return `${country}`;
  }

  _dropdown_2_renderRow(rowData, rowID, highlighted) {
    let icon = highlighted
      ? require("./Flags/fr.png")
      : require("./Flags/no.png");
    let evenRow = rowID % 2;
    return (
      <TouchableHighlight underlayColor="cornflowerblue">
        <View
          style={[
            styles.dropdown_2_row,
            {
              backgroundColor: evenRow ? "lemonchiffon" : "white"
            }
          ]}
        >
          <Image
            style={styles.dropdown_2_image}
            mode="stretch"
            source={this.state.DisplayFlag[rowData.code]}
          />
          <Text
            style={[
              styles.dropdown_2_row_text,
              highlighted && { color: "mediumaquamarine" }
            ]}
          >
            {`${rowData.country} (${rowData.code})`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    if (rowID == DEMO_OPTIONS_1.length - 1) return;
    let key = `spr_${rowID}`;
    return <View style={styles.dropdown_2_separator} key={key} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
    alignSelf: "flex-end",
    width: 150,
    marginTop: 32,
    right: 8,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: "cornflowerblue"
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
    height: 300,
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
