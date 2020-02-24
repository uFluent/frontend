import React from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  AppRegistry
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ModalDropdown from "react-native-modal-dropdown";
import { AsyncStorage } from "react-native";

export default class ProfileLogin extends React.Component {
  state = {
    text: "",
    submittedUser: "test",
    userData: ""
  };

  handleSubmit = async event => {
    event.preventDefault();
    const regex = new RegExp("^[a-zA-Z0-9]+$");
    const word = this.state.text;
    if (!regex.test(word)) {
      Alert.alert("Invalid characters");
    } else {
      this.props.setUsername(this.state.text);
      this.setState({ submittedUser: this.state.text, text: "" });
      //Save username to local storage
      await AsyncStorage.setItem("username", this.state.text);
    }
  };

  componentDidMount() {
    this.setState({ userData: this.props.userData });
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.submittedUser !== prevState.submittedUser) {
      this.setState({
        userData: { ...this.state.userData, username: this.state.submittedUser }
      });
    } //this will replace the user temp with the name of the user that is submitted, then at the same time there should be a post reqest to the backend database.
  }

  render(props) {
    const { userData } = this.state;
    if (!userData) {
      return (
        <View>
          <Text>.........................</Text>
          <Text>.........................</Text>
          <Text>.........................</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Please Choose a Username"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            maxLength={10}
          />

          <TouchableHighlight onPress={this.handleSubmit}>
            <Text>Submit!</Text>
          </TouchableHighlight>

          <Text>{this.state.submittedUser}</Text>
        </View>
      );
    }
    if (userData) {
      return <Text>Welcome back {userData.username}</Text>;
    }
  }

  // const navigation = useNavigation();
}
