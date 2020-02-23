import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "react-native-button";
import { styleMaker } from "./Quiz.Styles";

export default function QuizSelector() {
  const navigation = useNavigation();
  const goToWordMatch = () => {
    navigation.navigate("WordMatch");
  };
  const goToPictureMatch = () => {
    navigation.navigate("PictureMatch");
  };
  const styles = styleMaker();
  return (
    <View style={styles.alignCenter}>
      <Button onPress={goToPictureMatch}>Picture Match</Button>
      <Button onPress={goToWordMatch}>Word Match</Button>
    </View>
  );
}
