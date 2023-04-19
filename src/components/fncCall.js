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

// export const readQueue =(params)=>{
//         let text4 = params.room;
//         console.log("sound dashboard");
//         console.log("sound counter");
//         const audio = new Audio("../audio/call.mp3");
//         const audio1 = new Audio(
//           `../audio/${params.queue_no.charAt(0)}.mp3`
//         );
//         const audio2 = new Audio(
//           `../audio/${params.queue_no.charAt(1)}.mp3`
//         );
//         const audio3 = new Audio(
//           `../audio/${params.queue_no.charAt(2)}.mp3`
//         );
//         const audio4 = new Audio(
//           `../audio/${params.queue_no.charAt(3)}.mp3`
//         );
//         const audio5 = new Audio(`../audio/${text4}.mp3`);
//         const service = new Audio(`../audio/service.mp3`);
//         const audioEnd = new Audio(`../audio/endcall.mp3`);
       
//         audio.play();
//         audio.addEventListener("ended", function () {
//           audio1.play();
//         });
//         audio1.addEventListener("ended", function () {
//           audio2.play();
//         });
//         audio2.addEventListener("ended", function () {
//           audio3.play();
//         });
//         audio3.addEventListener("ended", function () {
//           audio4.play();
//         });
//         audio4.addEventListener("ended", function () {
//           service.play();
//         });
//         service.addEventListener("ended", function () {
//           audio5.play();
//         });
//         audio5.addEventListener("ended", function () {
//           audioEnd.play();
//         });
//         audioEnd.addEventListener("ended", function () {
//           console.log('Hello world')
//           if (!call) {
//             updateQ(params, 1);
//           } else {
//             updateQ(params);
//           }
//         });
      
// }
