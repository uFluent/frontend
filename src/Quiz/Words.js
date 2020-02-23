import { translateWord } from "../../api";

export const words = [
  "people",
  "car",
  "table",
  "world",
  "plant",
  "map",
  "family",
  "father",
  "train",
  "house",
  "book",
  "meat",
  "music",
  "dog",
  "cat",
  "snake",
  "mouse",
  "bottle",
  "food",
  "mushroom",
  "bird",
  "mother",
  "sister",
  "brother",
  "chair",
  "couch",
  "doll",
  "car",
  "bus"
];

export const getListOfWords = async (correctWord, number, language) => {
  const translatedCorrectWord = await translateWord(correctWord, language);
  const newList = [];
  newList.push(translatedCorrectWord);
  for (let i = 1; i < number; i++) {
    const newWord = words[Math.floor(Math.random() * words.length)];
    const newTranslatedWord = await translateWord(newWord, language);
    if (newList.includes(newTranslatedWord)) {
      i--;
    } else {
      newList.push(newTranslatedWord);
    }
  }
  return [
    newList.sort(function() {
      return 0.5 - Math.random();
    }),
    translatedCorrectWord
  ];
};
