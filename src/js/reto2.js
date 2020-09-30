var minutos = document.querySelector(".minutos");
var segundos = document.querySelector(".segundos");

function getAngle(el) {
  var st = window.getComputedStyle(el, null);
  var tr = st.getPropertyValue("transform");

  var values = tr.split("(")[1];
  values = values.split(")")[0];
  values = values.split(",");
  var a = values[0];
  var b = values[1];

  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
}

function setTime() {
  let angle = getAngle(segundos) + 6;
  let minAngle = getAngle(minutos) + 6;

  if (angle == -90) {
    minutos.style.transform = `rotate(${minAngle}deg)`;
  }

  segundos.style.transform = `rotate(${angle}deg)`;
}

setInterval(() => {
  setTime();
}, 1000);
