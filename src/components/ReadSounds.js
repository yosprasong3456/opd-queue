import { Howl, Howler } from "howler";

export const ReadSounds = () => {
  Howler.autoUnlock = true;
  const sound = new Howl({
    src: ["https://opd-queue.udch.work/audio/call.mp3"],
    html5: true,
  });
  const sound1 = new Howl({
    src: ["https://opd-queue.udch.work/audio/service.mp3"],
    html5: true,
  });
  sound.play();

  sound.on("end", function () {
    sound1.play();
  });
};
