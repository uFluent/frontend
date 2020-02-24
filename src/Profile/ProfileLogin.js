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

import styles from "./ProfileLogin.style";
import * as api from "../../api";


export default class ProfileLogin extends React.Component {
  state = {
    text: "",
    submittedUser: "test",
    userData: "",
    newUser: true
  };

  handleSubmit = async event => {
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
          await AsyncStorage.setItem("username", this.state.text);
          this.props.setUsername(this.state.text, res);
          this.setState({
            submittedUser: this.state.text,
            text: ""
          });
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
          await AsyncStorage.setItem("username", this.state.text);
          this.props.setUsername(this.state.text, res);
          this.setState({
            submittedUser: this.state.text,
            text: ""
          });
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

  componentDidMount() {
    this.setState({ userData: this.props.userData });
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.submittedUser !== prevState.submittedUser) {
      console.log("oh no");
      this.setState({

        userData: {
          ...this.state.userData,
          username: this.state.submittedUser
        }
      }); //this will replace the user temp with the name of the user that is submitted, then at the same time there should be a post reqest to the backend database.

  }

  render(props) {
    const { userData, newUser } = this.state;
    if (!userData) {
      if (!newUser) {
        return (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.uFluentText}>uFluent</Text>
              <Text>EXISTING</Text>
            </View>
            <View style={styles.loginContainer}>
              <View style={styles.login}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Existing User"
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  maxLength={14}
                />
                <TouchableOpacity
                  onPress={this.handleSubmit}
                  style={styles.buttonStyle}
                >
                  <Text>Login!</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={this.toggleNewUser}>
                <Text style={styles.toggleText}>Create New User</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.uFluentText}>uFluent</Text>
              <Text>NEW</Text>
            </View>
            <View style={styles.loginContainer}>
              <View style={styles.login}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Create New User"
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  maxLength={14}
                />
                <TouchableOpacity
                  onPress={this.handlePost}
                  style={styles.buttonStyle}
                >
                  <Text>Submit</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={this.toggleNewUser}>
                <Text style={styles.toggleText}>Already Have An Account?</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    if (userData) {
      return <Text>Welcome back {userData.username}</Text>;
    }
  }

  // const navigation = useNavigation();
}
