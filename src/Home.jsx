import React from "react";
import { View } from "react-native";
import Button from "react-native-button";
import * as MediaLibrary from "expo-media-library";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";

export default function Home() {
  const navigation = useNavigation();

  const goToQuiz = () => {
    navigation.navigate("QuizSelector");
  };
  return (
    <View style={styles.alignCenter}>
      <Button onPress={goToQuiz}>uFluent</Button>
    </View>
  );
}
