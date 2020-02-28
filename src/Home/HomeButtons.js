import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";

export default function HomeButtons() {
  let navigation = useNavigation();

  goToQuiz = () => {
    navigation.navigate("QuizSelector");
  };

  goToCamera = () => {
    navigation.navigate("Camera");
  };
  return (
    <View>
      <AwesomeButtonCartman
        onPress={goToQuiz}
        type="primary"
        size="large"
        style={{
          marginTop: 100
        }}
        borderRadius={(20, 50)}
        height={100}
        textSize={30}
        textColor="white"
        backgroundColor="red"
      >
        Games
      </AwesomeButtonCartman>
      <AwesomeButtonCartman
        onPress={goToCamera}
        type="secondary"
        style={{
          marginTop: 50
        }}
        size="large"
        borderRadius={(20, 50)}
        height={100}
        textSize={30}
        textColor="white"
        backgroundColor="purple"
      >
        Camera
      </AwesomeButtonCartman>
    </View>
  );
}
