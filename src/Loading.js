import React from "react";
import { Text, View } from "react-native";

import styled from "./Styles";
import LottieView from "lottie-react-native";

export default function LoadingScreen() {
  return (
    <View style={styled.alignCenter}>
      <LottieView
        source={require("./animations/226-splashy-loader (1).json")}
        autoPlay
      />
    </View>
  );
}
