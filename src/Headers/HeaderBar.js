import React from "react";
import { View, Text, Image } from "react-native";
import Button from "react-native-button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./HeaderBar.styles";

export default props => {
  const colorStyle = currentPage => {
    if (currentPage) return { backgroundColor: "white", color: "#d9bde3" };
    else return { backgroundColor: "#d9bde3", color: "white" };
  };
  const navigation = useNavigation();
  const handlePress = targetPath => {
    navigation.navigate(targetPath);
  };
  const DisplayFlag = {
    fr: { file: require(`../Flags/fr.png`) },
    es: {
      file: require(`../Flags/es.png`)
    },
    en: {
      file: require(`../Flags/en.png`)
    },
    no: {
      file: require(`../Flags/no.png`)
    }
  };
  return (
    <View style={styles.headerBar}>
      <Button onPress={() => handlePress("Home")}>
        <Ionicons
          name="md-home"
          size={30}
          style={[styles.homeButton, colorStyle(props.children === "Home")]}
        />
      </Button>
      <Button onPress={() => handlePress("Camera")}>
        <Ionicons
          name="md-camera"
          size={30}
          style={[
            styles.homeButton,
            styles.cameraButton,
            colorStyle(props.children === "Camera")
          ]}
        />
      </Button>
      <Button>
        <Text>Level: {props.userData.score}</Text>
      </Button>
      <Button onPress={() => handlePress("Profile")}>
        <Image
          source={DisplayFlag[props.userData.language].file}
          style={{ width: 50, height: 40 }}
        />
      </Button>
      <Button onPress={() => handlePress("Profile")}>
        <Ionicons
          name="md-person"
          size={30}
          style={[styles.homeButton, colorStyle(props.children === "Profile")]}
        />
      </Button>
      {/* <Button onPress={() => handlePress("QuizPicture")}>
        <Ionicons
          name=""
          size={30}
          style={[
            styles.homeButton,
            colorStyle(props.children === "QuizPicture")
          ]}
        />
      </Button> */}
    </View>
  );
};
