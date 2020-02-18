import React from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../Styles";

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.alignCenter}>
      <Text>User profile</Text>
    </View>
  );
};

export default Profile;
