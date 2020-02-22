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
      <Text style={styles.logoText}>uFluent</Text>
      <Buttons onPress={() => goToPage("Camera")} style={styles.homepageButton}>
        Camera
      </Buttons>
      <Button
        onPress={() => goToPage("QuizSelector")}
        style={styles.homepageButton}
      >
        Games
      </Button>
    </View>
  );
}
