import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "react-native-button";
import styles from "./QuizSelector.styles";

export default function QuizSelector() {
  const navigation = useNavigation();
  const goToWordMatch = () => {
    navigation.navigate("WordMatch");
  };
  const goToPictureMatch = () => {
    navigation.navigate("PictureMatch");
  };
  return (
    <View>
      <Button onPress={goToPictureMatch}>Picture Match</Button>
      <Button onPress={goToWordMatch}>Word Match</Button>
    </View>
  );
}
