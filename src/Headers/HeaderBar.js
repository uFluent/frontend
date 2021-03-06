import React from "react";
import { View, Text, Image } from "react-native";
import Button from "react-native-button";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./HeaderBar.styles";

export default props => {
  const colorStyle = currentPage => {
    if (currentPage) return { backgroundColor: "white", color: "#454547" };
    else return { backgroundColor: "#454547", color: "white" };
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
    de: {
      file: require(`../Flags/de.png`)
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

      <View>
        <Text style={styles.headerText}>{"uFluent"}</Text>
      </View>

      <View style={styles.profileButtons}>
        <View
          style={[
            styles.levelIndicator,
            {
              backgroundColor: `rgb(${200 - props.userData.score}, ${100 +
                props.userData.score}, 0)`
            }
          ]}
        >
          <Text style={{ fontSize: 25 }}>
            {Math.floor(props.userData.score / 10)}
          </Text>
        </View>
        <Button onPress={() => handlePress("Profile")}>
          <Image
            source={DisplayFlag[props.userData.language].file}
            style={styles.flagButton}
          />
        </Button>
        <Button onPress={() => handlePress("Profile")}>
          <Ionicons
            name="md-person"
            size={30}
            style={[
              styles.homeButton,
              colorStyle(props.children === "Profile")
            ]}
          />
        </Button>
      </View>
    </View>
  );
};
