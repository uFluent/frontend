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
import QuizPicture from "./src/Quiz/Quiz.Picture";
import Gallery from "./src/Camera/Gallery";
import PictureMatch from "./src//Quiz/PictureMatch";
import WordMatch from "./src/Quiz/WordMatch";
import ProfileLogin from "./src/Profile/ProfileLogin";
import * as api from "./api";
const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    userName: "",
    userData: "",
    isLoading: true,
    userError: false
  };

  setUsername = (setUsername, data) => {
    console.log(setUsername, data, "<<<in the app setUsername");
    this.setState({ userData: data.user, userName: setUsername });

    // this.setState({
    //   userName: setUsername
    //   // userData: {
    //   //   username: setUsername,
    //   //   avatarUrl: "https://picsum.photos/id/237/200/300",
    //   //   language: "fr",
    //   //   score: 100,
    //   //   imageCount: 3
    //   // }
    // });
    // this.setState({
    //   userData: { ...this.state.userData, username: setUsername }
    // }); //USE THIS WHEN WE ARE ABLE TO API REQUEST FROM BACKEND, RATHER THAN HAVE THE ABOVE
  };

  setLanguage = lang => {
    this.setState({
      userData: { ...this.state.userData, language: lang }
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

  // componentDidUpdate(prevProps, prevState) {
  //   const { userName } = this.state;
  //   if (userName !== prevState.userName) {
  //     api.getUser(userName).then(res => this.setState({ userData: res }));
  //   }
  // }

  render() {
    const { isLoading, userData, userName } = this.state;
    if (!userName) {
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
          {console.log(userData.language, "<<< checking in app")}
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
                userName: this.state.userName,
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
