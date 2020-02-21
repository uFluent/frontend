import React from "react";
import Constants from "expo-constants";
import * as Speech from "expo-speech";
import axios from "axios";

export const translateWord = (wordToTranslate, languageToChangeTo) => {
  return fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200221T160402Z.f59e589640b65d4b.800e13bd0a0f63c412a70eaabe374b29b4df230b&text=${wordToTranslate}&lang=${languageToChangeTo}&format=plain`
  )
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.text[0];
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
