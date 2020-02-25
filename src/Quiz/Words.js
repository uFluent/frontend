import { translateWord } from "../../api";

export const words = [
  "person",
  "umbrella",
  "tie",
  "backpack",
  "handbag",
  "suitcase",
  "bicycle",
  "motorcycle",
  "bus",
  "truck",
  "car",
  "aeroplane",
  "train",
  "boat",
  "traffic light",
  "stop sign",
  "bench",
  "fire hydrant",
  "parking meter",
  "bird",
  "dog",
  "sheep",
  "elephant",
  "zebra",
  "cat",
  "horse",
  "cow",
  "bear",
  "giraffe",
  "frisbee",
  "snowboard",
  "kite",
  "baseball glove",
  "surfboard",
  "skis",
  "ball",
  "baseball bat",
  "skateboard",
  "tennis racket",
  "bottle",
  "cup",
  "knife",
  "bowl",
  "wine glass",
  "fork",
  "spoon",
  "banana",
  "sandwich",
  "broccoli",
  "hot dog",
  "donut",
  "apple",
  "orange",
  "carrot",
  "pizza",
  "cake",
  "chair",
  "plant",
  "table",
  "couch",
  "bed",
  "toilet",
  "television",
  "mouse",
  "keyboard",
  "laptop",
  "remote",
  "phone",
  "microwave",
  "toaster",
  "fridge",
  "oven",
  "sink",
  "book",
  "vase",
  "teddy",
  "toothbrush",
  "clock",
  "scissors",
  "hair dryer"
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
