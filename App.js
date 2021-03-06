import "react-native-gesture-handler";
import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage } from "react-native";

import QuizSelector from "./src/Quiz/QuizSelector";
import Home from "./src/Home/Home";
import Profile from "./src/Profile/Profile";
import { CameraPage } from "./src/Camera/Camera";
import HeaderBar from "./src/Headers/HeaderBar";
import Gallery from "./src/Camera/Gallery";
import PictureMatch from "./src//Quiz/PictureMatch2";
import WordMatch from "./src/Quiz/WordMatch";
import LoadingScreen from "./src/Loading";
import LottieView from "lottie-react-native";

import ProfileLogin from "./src/Profile/ProfileLogin";
import * as api from "./api";
import styled from "./src/Styles";
const Stack = createStackNavigator();

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    userName: "",
    userData: "",
    isLoading: true,
    userError: false
  };

  setUsername = (setUsername, data) => {
    this.setState({
      userData: data.user,
      userName: setUsername
    });
  };

  updatePicture = url => {
    api
      .patchUser(this.state.userName, this.state.userData.language, url)
      .then(res => {
        this.setState({
          userData: {
            ...this.state.userData,
            avatarUrl: res.user.avatarUrl
          }
        });
      });
  };

  setLanguage = lang => {
    api.patchUser(this.state.userName, lang).then(res => {
      this.setState({
        userData: { ...this.state.userData, language: lang }
      });
    });
  };

  getUserFromLocalStorage = async () => {
    const username = await AsyncStorage.getItem("username");
    if (username)
      this.setState({
        userName: username
      });
  };

  async componentDidMount() {
    this.getUserFromLocalStorage();
    ///!!!!!
    AsyncStorage.removeItem("username");
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
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

    api.patchLevel(this.state.userName, 1).then(res => {});
  };

  getUserData = async () => {
    await api.getUser(this.state.userName).then(res => {
      this.setState({
        userData: res.user
      });
    });
  };

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
    if (userData === "" && userName !== "") {
      this.getUserData();

      return (
        <View style={styled.alignCenter}>
          <LottieView
            source={require("./src/animations/2523-loading.json")}
            autoPlay
          />
        </View>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#454547"
              },

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
                setLanguage: this.setLanguage,
                updatePicture: this.updatePicture
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
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            >
              {props => (
                <CameraPage {...props} userData={this.state.userData} />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Gallery"
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            >
              {props => <Gallery {...props} userData={this.state.userData} />}
            </Stack.Screen>
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
              options={{
                headerLeft: null,
                headerTitle: props => (
                  <HeaderBar {...props} userData={this.state.userData} />
                )
              }}
            >
              {props => (
                <WordMatch
                  {...props}
                  userData={this.state.userData}
                  increaseScore={this.increaseScore}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}
