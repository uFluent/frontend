# Ufluent frontend

Image recognition app built using machine learning, to help kids learn foreign languages by taking pictures and playing games. The app allows the user to log in and take photos of items, and it returns the name of the item in the language the user is learning, as well as to play quiz games to level up.

Ufluent Front-End:

- Github Link:https://github.com/uFluent/frontend
- Demo:

# Prerequisites

- Visual Studio Code or another alternative source-code editor.
- Linux or Windows.
- React-native

## Getting started:

The information below will allow you to get this application up and running.

- Installation:

* Clone this repository on to your local machine git clone https://github.com/taxenco/fend-nc-news ;
* Navigate into the repository;
* cd fe-nc-news;
* Open in your code editor (code .);
* Install dependencies (`npm install`);
* Start the application to run on your default browser (`npm start`);

  \*\* Note: To run the project locally,you must have node installed

# Ufluent sections

- The log-in page allows the user to log-in if the user existed beforehand and sign-up if the user did not exist before.

- Header component shows a home button to allow the user to go to the home page, shows user's level, user's language that by default will be English, and a profile button to access to the user's details.

- Home page shows the game button to go to the game section and the camera button to access to the image recognition page.

- Games page shows the two games that the app contains, Word Match and Picture Match. The Word Match is a game where the user will see an image and needs to pick the correct word from multiple options in the language selected. On the other hand, Picture Match shows a word to the user and needs to choose the correct one from several pictures. When the user guesses the word correctly, the frontend sends a patch request to the backend to level up the user's score. However, When the user does not guess the word, the correct answer is shown, but it does not affect the score.

- The profile page allows the user to change the avatarpicture and the language, as well as showing the user name and the level.

- The camera page permits the user to take a photo and send it to the backend to run the image recognition algorithm and predict what is inside of the picture. The app will return the word translated by making use of external API for translation and will use text-speech for allowing the user to listen to the word in the language selected by pressing a button.

# Dependencies

- "@expo/vector-icons": "^10.0.6",
- "@react-native-community/cameraroll": "^1.4.1",
- "@react-native-community/masked-view": "0.1.5",
- "@react-navigation/native": "^5.0.5",
- "@react-navigation/stack": "^5.0.5",
- "@trunkrs/react-native-image-compressor": "^0.1.3",
- "axios": "^0.19.2",
- "expo": "~36.0.0",
- "expo-camera": "^8.0.0",
- "expo-font": "^8.0.0",
- "expo-image-manipulator": "^8.0.0",
- "expo-image-picker": "~8.0.1",
- "expo-linear-gradient": "^8.0.0",
- "expo-media-library": "^8.0.0",
- "expo-permissions": "~8.0.0",
- "expo-speech": "^8.0.0",
- "lottie-react-native": "^3.3.2",
- "react": "^16.9.0",
- "react-animated-text": "^0.1.4",
- "react-dom": "^16.9.0",
- "react-native": "https://github.com/expo/react-native/archive/sdk-36.0.0.tar.gz",
- "react-native-animatable": "^1.3.3",
- "react-native-button": "^2.4.0",
- "react-native-cameraroll": "^1.0.0-alpha2",
- "react-native-easy-grid": "^0.2.2",
- "react-native-gesture-handler": "~1.5.0",
- "react-native-loading-dots": "^1.1.1",
- "react-native-modal-dropdown": "^0.7.0",
- "react-native-really-awesome-button": "^1.6.0",
- "react-native-reanimated": "~1.4.0",
- "react-native-safe-area-context": "0.6.0",
- "react-native-screens": "2.0.0-alpha.12",
- "react-native-simple-animations": "^0.2.2",
- "react-native-web": "~0.11.7",
- "redux": "^4.0.5"

# Authors

- Andrew Ng
- Carlos Beltran
- Joe Cooper
- Tom Limforth
- Mustafa Habashi

# Acknowledgments

The authors would like to thank all the team of NorthCoders.
