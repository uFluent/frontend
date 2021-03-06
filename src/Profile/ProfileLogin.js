import React from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
  ScrollView,
  AppRegistry,
  AsyncStorage
} from "react-native";
import { SimpleAnimation } from "react-native-simple-animations";
import * as Font from "expo-font";
import styles from "./ProfileLogin.style";
import * as api from "../../api";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class ProfileLogin extends React.Component {
  state = {
    text: "",
    // submittedUser: "",
    userData: "",

    newUser: true
  };

  handleSubmit = event => {
    event.preventDefault();
    const regex = new RegExp("^[a-zA-Z0-9]+$");
    const word = this.state.text;
    if (!regex.test(word)) {
      Alert.alert("Invalid characters");
    } else {
      api.getUser(this.state.text).then(res => {
        if (res.status) {
          return Alert.alert(res.msg);
        } else {
          AsyncStorage.setItem("username", this.state.text);
          this.props.setUsername(this.state.text, res);
          // this.setState({
          //   submittedUser: this.state.text,
          //   text: ""
          // });
        }
      });
    }
  };

  handlePost = event => {
    event.preventDefault();
    const regex = new RegExp("^[a-zA-Z0-9]+$");
    const word = this.state.text;
    if (!regex.test(word)) {
      Alert.alert("Invalid characters");
    } else {
      api.postUser(this.state.text).then(res => {
        if (res.status) {
          return Alert.alert(res.msg);
        } else {
          AsyncStorage.setItem("username", this.state.text);
          this.props.setUsername(this.state.text, res);
          // this.setState({
          //   submittedUser: this.state.text,
          //   text: ""
          // });
        }
      });
    }
  };

  toggleNewUser = event => {
    event.preventDefault();
    this.setState(currentState => ({
      newUser: !currentState.newUser,
      text: ""
    }));
  };

  async componentDidMount() {
    this.setState({ userData: this.props.userData });
    await Font.loadAsync({
      "Mansalva-Regular": require("../../assets/fonts/Mansalva-Regular.ttf"),
      "Baloo-Regular": require("../../assets/fonts/Baloo-Regular.ttf")
    });
    return this.setState({ fontLoaded: true });
  }

  render(props) {
    const { userData, newUser } = this.state;
    if (!userData) {
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={{ flexDirection: "row" }}>
              <SimpleAnimation
                delay={10}
                duration={3000}
                friction={2}
                movementType="slide"
                direction="left"
                distance={70}
              >
                {this.state.fontLoaded ? (
                  <Text
                    style={{
                      fontFamily: "Mansalva-Regular",
                      fontSize: 80
                    }}
                  >
                    u
                  </Text>
                ) : null}
              </SimpleAnimation>
              <SimpleAnimation
                delay={15}
                duration={3000}
                friction={2}
                movementType="spring"
                direction="up"
                distance={70}
              >
                {this.state.fontLoaded ? (
                  <Text
                    style={{
                      fontFamily: "Mansalva-Regular",
                      fontSize: 80
                    }}
                  >
                    Fluent
                  </Text>
                ) : null}
              </SimpleAnimation>
            </View>
          </View>

          {!newUser ? (
            <View style={styles.loginContainer}>
              <View style={styles.whichPageText}>
                <Text
                  style={[
                    styles.textInput2
                    // , { fontFamily: "Baloo-Regular" }
                  ]}
                >
                  LOGIN!
                </Text>
              </View>
              <View style={styles.login}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Existing User"
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  maxLength={14}
                />
                <TouchableHighlight
                  onPress={this.handleSubmit}
                  style={styles.buttonStyle}
                  underlayColor="lightblue"
                >
                  <Text>Submit</Text>
                </TouchableHighlight>
              </View>
              <TouchableOpacity onPress={this.toggleNewUser}>
                <Text style={styles.toggleText}>Create New Account?</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.loginContainer}>
              <View style={styles.whichPageText}>
                <Text
                  style={[
                    styles.textInput2
                    // { fontFamily: "Baloo-Regular" }
                  ]}
                >
                  CREATE!
                </Text>
              </View>

              <View style={styles.login}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Make New User"
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  maxLength={14}
                />
                <TouchableHighlight
                  onPress={this.handlePost}
                  style={styles.buttonStyle}
                  underlayColor="lightblue"
                >
                  <Text>Submit</Text>
                </TouchableHighlight>
              </View>
              <TouchableOpacity onPress={this.toggleNewUser}>
                <Text style={styles.toggleText}>Already Have An Account?</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    }
  }
}
