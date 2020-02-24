import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Button
} from "react-native";

import * as api from "../../api";
import styles from "./Profile.style";

// import ModalDropdown from 'react-native-modal-dropdown';
import ModalDropdown from "react-native-modal-dropdown";
import { SimpleAnimation } from "react-native-simple-animations";

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
      // userData: {
      //   username: "bob123",
      //   avatarUrl: "https://picsum.photos/id/237/200/300",
      //   language: "fr",
      //   score: 100,
      //   imageCount: 3
      // }
      userData: ""
    };
  }

  componentDidMount() {
    console.log(this.props.route.params.userData);
    this.setState({
      userData: this.props.route.params.userData
    });
  }

  render() {
    const { DisplayFlag, userData } = this.state;
    const { userName } = this.props.route.params;

    return (
      <View style={styles.container}>
        <SimpleAnimation
          delay={1000}
          duration={2000}
          // direction="right"
          staticType="zoom"
          distance={20}
          // friction={4}
        >
          <Image
            source={{ uri: userData.avatarUrl }}
            style={styles.imageProfile}
          />
        </SimpleAnimation>
        <View>
          <SimpleAnimation
            delay={1000}
            duration={5000}
            direction="right"
            staticType="bounce"
            distance={20}
            friction={4}
          >
            <View style={styles.sections}>
              <Text style={styles.text}>{userName}</Text>
            </View>
          </SimpleAnimation>
        </View>

        <View>
          <SimpleAnimation
            delay={1000}
            duration={3000}
            friction={4}
            movementType="spring"
            direction="right"
            distance={70}
          >
            <View style={styles.sections}>
              <View style={styles.languageContainer}>
                <Image
                  source={DisplayFlag[userData.language]}
                  style={{ width: 75, height: 50 }}
                />
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
              </View>
            </View>
          </SimpleAnimation>
        </View>
        <View>
          <SimpleAnimation
            delay={1000}
            duration={3000}
            friction={4}
            movementType="spring"
            direction="up"
            distance={70}
          >
            <View style={styles.sections}>
              <Text style={styles.text}>Score: {userData.score}</Text>
            </View>
          </SimpleAnimation>
        </View>

        <Text>{userData.language}</Text>

        <Text>Language: {this.displayCountry()}</Text>
        <Button onPress={this.updateLanguage} title="Update Profile!"></Button>
      </View>
    );
  }

  updateLanguage = event => {
    event.preventDefault();
    api.patchUser().then(res => {
      console.log(res, "< res in profile");
    });
  };

  displayCountry = () => {
    const { userData } = this.props.route.params;
    if (userData.language === "fr") return "French";
    if (userData.language === "no") return "Norwegian";
    if (userData.language === "en") return "English";
    if (userData.language === "es") return "Spanish";
    return "Country";
  };

  _dropdown_2_renderButtonText(rowData) {
    const { country, code } = rowData;
    this.setState(
      {
        userData: { ...this.state.userData, language: code }
      },
      () => {
        this.props.route.params.setLanguage(code);
      }
    );
    return `${country}`;
  }

  _dropdown_2_renderRow(rowData, rowID, highlighted) {
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
