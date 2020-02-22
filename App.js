import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import QuizSelector from "./src/Quiz/QuizSelector";
import Home from "./src/Home";
import Profile from "./src/Profile/Profile";
import { CameraPage } from "./src/Camera/Camera";
import HeaderBar from "./src/Headers/HeaderBar";
import Gallery from "./src/Camera/Gallery";
import PictureMatch from "./src//Quiz/PictureMatch";
import WordMatch from "./src/Quiz/WordMatch";

import ProfileLogin from "./src/Profile/ProfileLogin";
const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    userData: "",
    isLoading: true
  };

  setUsername = setUsername => {
    this.setState({
      userData: {
        username: setUsername,
        avatarUrl: "https://picsum.photos/id/237/200/300",
        language: "fr",
        score: 100,
        imageCount: 3
      }
    });
    // this.setState({
    //   userData: { ...this.state.userData, username: setUsername }
    // }); //USE THIS WHEN WE ARE ABLE TO API REQUEST FROM BACKEND, RATHER THAN HAVE THE ABOVE
  };

  setLanguage = language => {
    this.setState({
      userData: { ...this.state.userData, language: language }
    });
  };

  componentDidMount() {
    //hard code data in, should be api request
    this.setState({
      // userData: { // IF YOU DONT WANT TO LOG IN ALL THE TIME ADD THIS IS
      //   username: "bob123",
      //   avatarUrl: "https://picsum.photos/id/237/200/300",
      //   language: "fr",
      //   score: 100,
      //   imageCount: 3
      // },
      isLoading: false
    });
  }

  render() {
    const { isLoading, userData } = this.state;
    if (!userData) {
      return (
        <ProfileLogin
          userData={this.state.userData}
          setUsername={this.setUsername}

        />
      );
    }
    if (isLoading) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#d9bde3"
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold"
              }
            }}
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              initialParams={{
                userData: this.state.userData,
                setLanguage: this.setLanguage
              }}
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            />
            <Stack.Screen
              name="Camera"
              component={CameraPage}
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            />
            <Stack.Screen
              name="QuizPicture"
              component={QuizPicture}
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            />
            <Stack.Screen
              name="Gallery"
              component={Gallery}
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            />
            <Stack.Screen
              name="QuizSelector"
              component={QuizSelector}
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            />
            <Stack.Screen
              name="PictureMatch"
              component={PictureMatch}
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            />
            <Stack.Screen
              name="WordMatch"
              component={WordMatch}
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}
