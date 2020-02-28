import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import styles from "../Styles";
import { SimpleAnimation } from "react-native-simple-animations";
import LottieView from "lottie-react-native";

export default function QuizSelector() {
  const navigation = useNavigation();
  const goToWordMatch = () => {
    navigation.navigate("WordMatch");
  };
  const goToPictureMatch = () => {
    navigation.navigate("PictureMatch");
  };
  return (
    <View style={styles.alignCenter}>
      <SimpleAnimation
        delay={500}
        duration={2000}
        direction="right"
        movementType="slide"
        distance={90}
        friction={3}
      >
        <AwesomeButtonCartman
          onPress={goToPictureMatch}
          type="primary"
          size="large"
          style={{
            marginTop: 50
          }}
          borderRadius={(20, 50)}
          height={100}
          textSize={30}
          textColor="white"
          backgroundColor="blue"
        >
          Picture Match
        </AwesomeButtonCartman>
      </SimpleAnimation>
      <SimpleAnimation
        delay={500}
        duration={2000}
        direction="left"
        movementType="slide"
        distance={80}
        friction={3}
      >
        <AwesomeButtonCartman
          onPress={goToWordMatch}
          type="secondary"
          style={{
            marginTop: 150
          }}
          size="large"
          borderRadius={(20, 50)}
          height={100}
          textSize={30}
          textColor="white"
          backgroundColor="green"
        >
          Word Match
        </AwesomeButtonCartman>
      </SimpleAnimation>
      <View>
        <View
          style={{
            width: 400,
            height: 300,
            position: "absolute",
            marginLeft: -190,
            marginTop: -180
          }}
        >
          <LottieView
            source={require("../animations/16475-line-art-of-city-landscape-and-landmark.json")}
            autoPlay
            loop
            speed={1}
          />
        </View>
      </View>
    </View>
  );
}
