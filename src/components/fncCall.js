export const callNewVoice = (params) => {
  const message = new SpeechSynthesisUtterance(params);
  message.lang = "th-TH";
  message.rate = 0.2;
  message.volume = 1;
  message.onend = function (e) {
    console.log("Finished in " + e.elapsedTime + " seconds.");
  };
  speechSynthesis.speak(message);
};
