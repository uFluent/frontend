import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
  Animated,
  Easing
} from "react-native";
import styles from "../Styles";
import * as Animatable from "react-native-animatable";
import HomeButtons from "./HomeButtons";
import { SimpleAnimation } from "react-native-simple-animations";
import * as Font from "expo-font";
import LottieView from "lottie-react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      animatedValue: new Animated.Value(0),
      animatedValue2: new Animated.Value(0)
    };
  }

  startAnimation = num => {
    Animated.loop(
      Animated.timing(this.state.animatedValue, {
        toValue: 1,
        duration: 60000,
        easing: Easing.linear
      })
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.animatedValue2, {
          toValue: 1,
          duration: 8000
        }),
        Animated.timing(this.state.animatedValue2, {
          toValue: 0,
          duration: 8000
        })
      ])
    ).start();
  };

  async componentDidMount() {
    this.startAnimation(1);
    await Font.loadAsync({
      "Mansalva-Regular": require("../../assets/fonts/Mansalva-Regular.ttf")
    });
    return this.setState({ fontLoaded: true });
  }

  render() {
    const interpolateRotation = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    const animatedStyle = {
      transform: [{ rotate: interpolateRotation }]
    };

    const interpolateMovement = this.state.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0]
    });
    const animatedMovement = {
      top: interpolateMovement
    };

    return (
      <View style={styles.alignCenter}>
        <View
          style={{
            width: winWidth + 30,
            height: 300,
            zIndex: -1,
            position: "absolute",
            flex: 1,
            top: 50
          }}
        >
          <Image
            source={require("./background2.png")}
            style={{
              width: winWidth + 30,
              height: 300,
              zIndex: -1,
              position: "absolute",
              flex: 1,
              top: -6,
              left: 5
            }}
          ></Image>

          <Animated.Image
            source={require("./sun.png")}
            style={[
              { width: 50, height: 50, position: "absolute", left: 280 },
              animatedStyle
            ]}
          />
          <Animated.Image
            source={require("./balloon.png")}
            style={[
              { width: 40, height: 40, position: "absolute", left: 30 },
              animatedMovement
            ]}
          />
        </View>
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

        <View>
          <View style={{ flexDirection: "row" }}>
            <SimpleAnimation
              delay={1000}
              duration={3000}
              friction={2}
              movementType="slide"
              direction="left"
              distance={0}
            >
              {this.state.fontLoaded ? (
                <Text
                  style={{
                    fontFamily: "Mansalva-Regular",

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

                    fontSize: 80
                  }}
                >
                  Fluent
                </Text>
              ) : null}
            </SimpleAnimation>
          </View>
        </View>
      </View>
    );
  }
}
