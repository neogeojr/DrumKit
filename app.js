function playSound(keyCodeOrEvent) {
  const keyCode =
    typeof keyCodeOrEvent === "number"
      ? keyCodeOrEvent
      : keyCodeOrEvent.keyCode;

  //console.log(typeof keyCodeOrEvent, keyCode);

  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio || !key) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return; // skip - only care about the longest event -> transform
  e.target.classList.remove("playing");
}

const keys = document.querySelectorAll(".key"); // Div elements Node list
//console.log(keys);

keys.forEach((keyEl) => {
  keyEl.addEventListener("transitionend", removeTransition);

  // **Parethesis for the function are allowed as the function is being passed via the arrow function
  // **Arrow functions let you wrap a function call so it runs later.
  keyEl.addEventListener("click", () => {
    const keyCode = Number(keyEl.dataset.key); // "65" -> 65
    playSound(keyCode); // **
  });
});

document.addEventListener("keydown", playSound);
