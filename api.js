import React from "react";
import Constants from "expo-constants";
import * as Speech from "expo-speech";
import axios from "axios";

export const translateWord = (wordToTranslate, languageToChangeTo) => {
  return fetch(
    `https://api.mymemory.translated.net/get?q=${wordToTranslate}&langpair=en|${languageToChangeTo}`
  )
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.matches;
    })
    .catch(error => {
      console.error(error);
    });
};

export const sayWord = (word, language) => {
  Speech.speak(word, {
    language: language,
    pitch: 1,
    rate: 1
  });
};

export const getPictureData = base64 => {
  axios.post("url", { base64 }).then(results => {
    return results;
  });
};
