import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Button from "react-native-button";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import styles from "../Styles";
import * as Animatable from "react-native-animatable";
import HomeButtons from "./HomeButtons";
import { SimpleAnimation } from "react-native-simple-animations";
import * as Font from "expo-font";
// import LottieView from "lottie-react-native";

export default class Home extends Component {
  constructor() {
    super();
    this.state = { fontLoaded: false };
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Mansalva-Regular": require("../../assets/fonts/Mansalva-Regular.ttf")
    });
    return this.setState({ fontLoaded: true });
  }
  render() {
    return (
      <View style={styles.alignCenter}>
        <SimpleAnimation
          delay={500}
          duration={5000}
          direction="right"
          staticType="bounce"
          distance={20}
          friction={2.5}
        >
          <HomeButtons></HomeButtons>
        </SimpleAnimation>
        <View style={{ flexDirection: "row" }}>
          {/* <LottieView
            source={require("../animations/72-favourite-app-icon.json")}
            autoPlay
          style={{}}
            
          /> */}
          <SimpleAnimation
            delay={1000}
            duration={3000}
            friction={2}
            movementType="slide"
            direction="left"
            distance={70}
          >
            {this.state.fontLoaded ? (
              <Text
                style={{
                  fontFamily: "Mansalva-Regular",
                  // fontWeight: "bold",
                  fontSize: 80
                }}
              >
                u
              </Text>
            ) : null}
          </SimpleAnimation>
          <SimpleAnimation
            delay={1500}
            duration={3000}
            friction={2}
            movementType="spring"
            direction="up"
            distance={70}
          >
            {this.state.fontLoaded ? (
              <Text
                style={{
                  fontFamily: "Mansalva-Regular",
                  // fontWeight: "bold",
                  fontSize: 80
                }}
              >
                Fluent
              </Text>
            ) : null}
          </SimpleAnimation>
        </View>
      </View>
    );
  }
}
