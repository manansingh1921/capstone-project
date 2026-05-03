export const playSound = (name) => {
  try {
    const audio = new Audio(`/sounds/${name}.mp3`);
    audio.volume = 0.3;
    audio.play();
  } catch (e) {
    console.log("Sound error:", e);
  }
};
