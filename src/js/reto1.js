function setTime() {
  let time = new Date();
  document.querySelector(
    ".reloj-digital"
  ).innerHTML = time.toLocaleTimeString().padStart(8, 0);
}

setInterval(() => {
  setTime();
}, 1000);
