import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "react-native-button";
// import styles from "./QuizSelector.styles";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import styles from "../Styles";
import { SimpleAnimation } from "react-native-simple-animations";

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
            marginTop: 100
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
            marginTop: 50
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
    </View>
  );
}
