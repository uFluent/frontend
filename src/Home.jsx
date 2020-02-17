import React from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./Styles";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.alignCenter}>
      <Text>Hello</Text>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate("Profile", { name: "Jane" })}
      />
      <Button
        title="CameraPage"
        onPress={() => navigation.navigate("CameraPage")}
      />
    </View>
  );
};

export default Home;
