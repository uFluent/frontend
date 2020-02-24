import React from "react";
import { View, Text } from "react-native";
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
      <Text>More to come...</Text>
    </View>
  );
}
