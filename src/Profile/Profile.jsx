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
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import * as Font from "expo-font";

import ModalDropdown from "react-native-modal-dropdown";
import { SimpleAnimation } from "react-native-simple-animations";

const languageOptions = [
  { country: "ENGLISH", code: "en" },
  { country: "SPANISH", code: "es" },
  { country: "FRENCH", code: "fr" },
  { country: "GERMAN", code: "de" }
];

const themeArray = [
  {
    borderColor: "white",
    backgroundColor: "rgb(255,159,157)",
    backgroundDark: "rgb(32, 140, 42)"
  },
  {
    borderColor: "green",
    backgroundColor: "red",
    backgroundDark: "blue"
  }
];

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdown_4_options: null,
      dropdown_4_defaultValue: "loading...",
      dropdown_6_icon_heart: true,
      themeNumber: 0,
      fontLoaded: false,
      font: "serif",
      DisplayFlag: {
        fr: require(`./Flags/fr.png`),
        es: require(`./Flags/es.png`),
        en: require(`./Flags/en.png`),
        de: require(`./Flags/de.png`)
      },
      userData: "",
      avatarUrl: {
        0: "https://i.picsum.photos/id/1062/250/250.jpg",
        1: "https://i.picsum.photos/id/1003/250/250.jpg",
        2: "https://i.picsum.photos/id/1025/250/250.jpg",
        3: "https://i.picsum.photos/id/1074/250/250.jpg",
        4: "https://edaid-live.s3.amazonaws.com/filestore/images/manual/northcoders-appeal-view.png",
        5: "https://www.simplethingcalledlife.com/wp-content/uploads/2015/03/animals-in-hats-3-550x640.jpg"
      }
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Baloo-Regular": require("../../assets/fonts/Baloo-Regular.ttf")
    });
    this.setState({
      userData: this.props.route.params.userData,
      fontLoaded: true,
      font: "Baloo-Regular"
    });
  }

  render() {
    const { DisplayFlag, userData } = this.state;
    const { userName } = this.props.route.params;
    const { themeNumber } = this.state;
    let score = 0;
    if (userData.score) score = (userData.score % 10) * 0.1;

    return (
      <View style={styles.container}>
        <SimpleAnimation
          delay={1000}
          duration={2000}
          direction="right"
          staticType="zoom"
          distance={20}
          friction={4}
        >
          <TouchableOpacity onPress={this.updatePicture}>
            <Image
              source={{ uri: userData.avatarUrl }}
              style={styles.imageProfile}
            />
          </TouchableOpacity>
        </SimpleAnimation>

        <View>
          <SimpleAnimation
            delay={600}
            duration={5000}
            direction="right"
            staticType="bounce"
            distance={20}
            friction={4}
          >
            <AwesomeButtonCartman
              type="secondary"
              style={{
                marginTop: 10
              }}
              size="small"
              borderRadius={(20, 50)}
              height={65}
              textSize={30}
              width={300}
              borderWidth={3}
              backgroundColor={themeArray[themeNumber].backgroundColor}
              borderColor={themeArray[themeNumber].borderColor}
              backgroundDarker={themeArray[themeNumber].backgroundDark}
              raiseLevel={10}
            >
              <Text style={[styles.text, { fontFamily: this.state.font }]}>
                {userName}
              </Text>
            </AwesomeButtonCartman>
          </SimpleAnimation>
        </View>

        <View>
          <SimpleAnimation
            delay={400}
            duration={3000}
            friction={4}
            movementType="spring"
            direction="right"
            distance={70}
          >
            <AwesomeButtonCartman
              type="secondary"
              style={{
                marginTop: 20
              }}
              size="small"
              borderRadius={(20, 50)}
              height={65}
              textSize={30}
              width={300}
              borderWidth={3}
              backgroundColor={themeArray[themeNumber].backgroundColor}
              borderColor={themeArray[themeNumber].borderColor}
              backgroundDarker={themeArray[themeNumber].backgroundDark}
              raiseLevel={10}
            >
              <View style={styles.languageContainer}>
                <Image
                  source={DisplayFlag[userData.language]}
                  style={{ width: 75, height: 50, left: 60 }}
                />

                <ModalDropdown
                  ref="dropdown_2"
                  style={styles.dropdown_2}
                  textStyle={[
                    styles.dropdown_2_text,
                    { fontFamily: this.state.font }
                  ]}
                  dropdownStyle={styles.dropdown_2_dropdown}
                  options={languageOptions}
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
                {/* </View> */}
              </View>
            </AwesomeButtonCartman>
          </SimpleAnimation>
        </View>

        <View>
          <SimpleAnimation
            delay={200}
            duration={3000}
            friction={4}
            movementType="spring"
            direction="up"
            distance={70}
          >
            <AwesomeButtonCartman
              type="secondary"
              style={{
                marginTop: 20
              }}
              size="small"
              borderRadius={(20, 50)}
              height={65}
              textSize={30}
              width={300}
              borderWidth={3}
              backgroundColor={themeArray[themeNumber].backgroundColor}
              borderColor={themeArray[themeNumber].borderColor}
              backgroundDarker={themeArray[themeNumber].backgroundDark}
              raiseLevel={10}
            >
              <View style={styles.sections}>
                <View style={[styles.levelBar, { width: 320 * score }]}></View>

                <Text style={[styles.text, { fontFamily: this.state.font }]}>
                  Level: {Math.ceil(userData.score / 10)}
                </Text>
              </View>
            </AwesomeButtonCartman>
          </SimpleAnimation>
        </View>
      </View>
    );
  }

  updateTheme = number => {};

  updatePicture = event => {
    event.preventDefault();
    let number = Math.floor(Math.random() * 6);
    this.setState({
      userData: {
        ...this.state.userData,
        avatarUrl: this.state.avatarUrl[number]
      }
    });
    this.props.route.params.updatePicture(this.state.avatarUrl[number]);
    this.updateTheme(number);
  };

  displayCountry = () => {
    const { userData } = this.props.route.params;
    if (userData.language === "fr") return "FRENCH";
    if (userData.language === "de") return "GERMAN";
    if (userData.language === "en") return "ENGLISH";
    if (userData.language === "es") return "SPANISH";
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
            {`${rowData.country}`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  _dropdown_2_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    if (rowID == languageOptions.length - 1) return;
    let key = `spr_${rowID}`;
    return <View style={styles.dropdown_2_separator} key={key} />;
  }
}
