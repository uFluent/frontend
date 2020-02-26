import React from "react";
import Constants from "expo-constants";
import * as Speech from "expo-speech";
import axios from "axios";

export const translateWord = (wordToTranslate, languageToChangeTo) => {
  // if (wordToTranslate === "nothing recognised") return "Oops! Try again!";
  // else
  return fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200221T160402Z.f59e589640b65d4b.800e13bd0a0f63c412a70eaabe374b29b4df230b&text=${wordToTranslate}&lang=${languageToChangeTo}&format=plain`
  )
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.text[0];
    })
    .catch(error => {
      // console.error(error);
    });
};

export const sayWord = (word, language) => {
  let variableRate = 1;
  if (language === "es") variableRate = 0.6;
  Speech.speak(word, {
    language: language,
    pitch: 1,
    rate: variableRate
  });
};

export const getPictureData = base64 => {
  return axios
    .post("https://ufluent.herokuapp.com/api/pictures/", {
      data: base64,
      fast: true
    })
    .then(results => {
      return results.data.outcome;
    });
};

export const getUser = username => {
  return fetch(`http://ufluent.herokuapp.com/api/users/${username}/`)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
};

export const postUser = username => {
  return fetch(`http://ufluent.herokuapp.com/api/users/`, {
    method: "POST",
    body: JSON.stringify({ username: username, language: "en" })
  }).then(function(res) {
    return res
      .json()
      .then(function(data) {
        return data;
      })
      .catch(error => {
        return { status: 400, msg: "User already taken" };
      });
  });
};

export const patchUser = (username, language, avatar) => {
  return fetch(`http://ufluent.herokuapp.com/api/users/${username}/`, {
    method: "PATCH",
    body: JSON.stringify({
      avatarUrl: avatar,
      language: language
    })
  })
    .then(function(res) {
      return res.json();
    })
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      console.log("in the error");
    });
};
// avatarUrl: "https://picsum.photos/id/237/200/300",
// score: 2,
// img_id: 1

export const patchLevel = (username, level) => {
  return fetch(`http://ufluent.herokuapp.com/api/users/${username}/`, {
    method: "PATCH",
    body: JSON.stringify({
      score: level
    })
  })
    .then(function(res) {
      return res.json();
    })
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.log(error);
      console.log("in the error");
    });
};

export const getGenericPicture = num => {
  return axios
    .get(`https://ufluent.herokuapp.com/api/pictures/${num}`)
    .then(result => {
      return result.data.picture;
    });
};
