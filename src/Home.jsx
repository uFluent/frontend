import React from "react";
import { View } from "react-native";
import Button from "react-native-button";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";

export default function Home() {
  const navigation = useNavigation();

  const goToPage = target => {
    navigation.navigate(target);
  };

  return (
    <View style={styles.alignCenter}>
      <Text>uFluent</Text>
      <Buttons onPress={() => goToPage("Camera")}>Camera</Buttons>
      <Button onPress={() => goToPage("QuizSelector")}>Games</Button>
    </View>
  );
}
