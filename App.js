import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage } from "react-native";

import QuizSelector from "./src/Quiz/QuizSelector";
import Home from "./src/Home";
import Profile from "./src/Profile/Profile";
import { CameraPage } from "./src/Camera/Camera";
import HeaderBar from "./src/Headers/HeaderBar";
import Gallery from "./src/Camera/Gallery";
import PictureMatch from "./src//Quiz/PictureMatch";
import WordMatch from "./src/Quiz/WordMatch";
import LoadingScreen from "./src/Loading";

import ProfileLogin from "./src/Profile/ProfileLogin";
const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    userData: "",
    isLoading: true
  };

  setUsername = setUsername => {
    console.log("username set");
    this.setState({
      userData: {
        username: setUsername,
        avatarUrl: "https://picsum.photos/id/237/200/300",
        language: "fr",
        score: 0,
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

  getUserFromLocalStorage = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username)
      this.setState({
        userData: {
          username: username,
          avatarUrl: "https://picsum.photos/id/237/200/300",
          language: "fr",
          score: 0,
          imageCount: 3
        },
        isLoading: false
      });
    else {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.getUserFromLocalStorage();
    //hard code data in, should be api request
    // this.setState({
    //   // userData: { // IF YOU DONT WANT TO LOG IN ALL THE TIME ADD THIS IS
    //   //   username: "bob123",
    //   //   avatarUrl: "https://picsum.photos/id/237/200/300",
    //   //   language: "fr",
    //   //   score: 100,
    //   //   imageCount: 3
    //   // },
    //   isLoading: false
    // });
  }

  increaseScore = () => {
    this.setState(currentState => {
      return {
        userData: {
          ...currentState.userData,
          score: currentState.userData.score + 1
        }
      };
    });
  };

  //We need: a loading screen that plays when you start the app
  //Then it checks if there is user data stored in phone - if no, goes to profileLogin
  //If yes, sends api request for userinfo, then when it gets it goes to home page

  render() {
    const { isLoading, userData } = this.state;
    if (isLoading) {
      return <Text>Loading...</Text>;
    } else if (!userData) {
      return (
        <ProfileLogin
          userData={this.state.userData}
          setUsername={this.setUsername}
        />
      );
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
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            >
              {props => (
                <PictureMatch
                  {...props}
                  userData={this.state.userData}
                  increaseScore={this.increaseScore}
                />
              )}
            </Stack.Screen>
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
