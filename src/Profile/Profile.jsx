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

// import ModalDropdown from 'react-native-modal-dropdown';
import ModalDropdown from "react-native-modal-dropdown";
import { SimpleAnimation } from "react-native-simple-animations";

const DEMO_OPTIONS_1 = ["option 1", "option 2", "option 3", "option 4"];
const DEMO_OPTIONS_2 = [
  { country: "English", code: "en" },
  { country: "Spanish", code: "es" },
  { country: "French", code: "fr" },
  { country: "German", code: "de" }
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
        de: require(`./Flags/de.png`)
      },
      userData: "",
      avatarUrl: {
        0: "https://i.picsum.photos/id/1062/250/250.jpg",
        1: "https://i.picsum.photos/id/1003/250/250.jpg",
        2: "https://i.picsum.photos/id/1025/250/250.jpg",
        3: "https://i.picsum.photos/id/1074/250/250.jpg",
        4: "https://edaid-live.s3.amazonaws.com/filestore/images/manual/northcoders-appeal-view.png",
        5: "https://purr.objects-us-east-1.dream.io/i/QlS3V.jpg"
      }
    };
  }

  componentDidMount() {
    this.setState({
      userData: this.props.route.params.userData
    });
  }

  render() {
    const { DisplayFlag, userData } = this.state;
    const { userName } = this.props.route.params;
    let score = 0;
    if (userData.score) score = (userData.score % 10) * 0.1;
    console.log(score);

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
              backgroundColor="#edff8f"
              borderColor="#ffb3ba"
              backgroundDarker="#ff9668"
              raiseLevel={4}
            >
              {/* <View style={styles.sections}> */}
              <Text style={styles.text}>{userName}</Text>
              {/* </View> */}
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
                marginTop: 10
              }}
              size="small"
              borderRadius={(20, 50)}
              height={65}
              textSize={30}
              width={300}
              backgroundColor="#edff8f"
              borderColor="#ffb3ba"
              backgroundDarker="#ff9668"
              raiseLevel={4}
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
                    renderSeparator={(
                      sectionID,
                      rowID,
                      adjacentRowHighlighted
                    ) =>
                      this._dropdown_2_renderSeparator(
                        sectionID,
                        rowID,
                        adjacentRowHighlighted
                      )
                    }
                  ></ModalDropdown>
                </View>
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
                marginTop: 10
              }}
              size="small"
              borderRadius={(20, 50)}
              height={65}
              textSize={30}
              width={300}
              backgroundColor="#edff8f"
              borderColor="#ffb3ba"
              backgroundDarker="#ff9668"
              raiseLevel={4}
            >
       
         
            <View style={styles.sections}>
              <View style={[styles.levelBar, { width: 300 * score }]}></View>
              <Text style={styles.text}>
                Level: {Math.ceil(userData.score / 10)}
              </Text>
            </View>
   </AwesomeButtonCartman>

          </SimpleAnimation>
        </View>
      </View>
    );
  }

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
  };

  displayCountry = () => {
    const { userData } = this.props.route.params;
    if (userData.language === "fr") return "French";
    if (userData.language === "de") return "German";
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
