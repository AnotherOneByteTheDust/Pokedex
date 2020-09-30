function newElement(type, classStyles, src) {
  let el;

  switch (type) {
    case "div":
      el = document.createElement("div");
      el.classList.add(...classStyles);
      break;
    case "img":
      el = document.createElement("img");
      el.classList.add(...classStyles);
      el.setAttribute("src", src);
      break;
    case "p":
      el = document.createElement("p", classStyles);
      let text = document.createTextNode(classStyles);
      el.appendChild(text);
      break;
  }
  return el;
}

class Pokemon {
  constructor(parsedMons, i) {
    this.pokemon = parsedMons;
    this.id = i;

    this.generateDom(parsedMons, i);
  }

  generateDom(parsedMons, i) {
    // Crear elemento padre
    let parent = newElement("div", ["pokemon", parsedMons["name"]]);
    document.body.appendChild(parent);
    this.parent = document.querySelector(`.${parsedMons["name"]}`);
    VanillaTilt.init(this.parent, { scale: 1.05, reverse: true });

    // Listeners en todo el elemento
    this.parent.addEventListener("mouseenter", this);
    this.parent.addEventListener("mouseleave", this);
    this.parent.addEventListener("click", this);

    // Añadir subelementos del bloque
    let pokemonimg = newElement("div", ["pokemonimg"]);
    this.parent.appendChild(pokemonimg);
    pokemonimg.appendChild(newElement("div", ["decoration"]));
    this.imgback = pokemonimg.appendChild(
      newElement("img", ["back"], parsedMons["back"])
    );
    this.imgfront = pokemonimg.appendChild(
      newElement("img", ["front", "hidden"], parsedMons["front"])
    );
    let textbox = newElement("div", ["textbox"]);
    this.parent.appendChild(textbox);
    let text = `#${i} ${parsedMons["name"]}`;
    textbox.appendChild(newElement("p", text));
  }

  addHoverStyle() {
    switch (this.pokemon["type"]) {
      case "grass":
        this.parent.style.background =
          "linear-gradient(to top, #032911, #065316)";
        break;
      case "fire":
        this.parent.style.background =
          "linear-gradient(to top, #290403, #99330c)";
        break;
      case "normal":
        this.parent.style.background =
          "linear-gradient(to top, #1c1c1c, #6b6b6b)";
        break;
      case "water":
        this.parent.style.background =
          "linear-gradient(to top, #031a29, #066da1)";
        break;
      case "poison":
        this.parent.style.background =
          "linear-gradient(to top, #120329, #260653)";
        break;
      case "ghost":
        this.parent.style.background =
          "linear-gradient(to top, #000005, #230057)";
        break;
      case "rock":
        this.parent.style.background =
          "linear-gradient(to top, #21160a, #4f3518)";
        break;
      case "dragon":
        this.parent.style.background =
          "linear-gradient(to top, #031a29, #063253)";
        break;
      case "bug":
        this.parent.style.background =
          "linear-gradient(to top, #232903, #495306)";
        break;
      case "ground":
        this.parent.style.background =
          "linear-gradient(to top, #63411a, #ba7d36)";
        break;
      case "electric":
        this.parent.style.background =
          "linear-gradient(to top, #292603, #a19406)";
        break;
      case "fighting":
        this.parent.style.background =
          "linear-gradient(to top, #170000, #4a0000)";
        break;
      case "psychic":
        this.parent.style.background =
          "linear-gradient(to top, #29031c, #a1067d)";
        break;
      case "fairy":
        this.parent.style.background =
          "linear-gradient(to top, #5b345c, #f08af2)";
        break;
      case "ice":
        this.parent.style.background =
          "linear-gradient(to top, #003b37, #00a69e)";
        break;
    }

    this.imgback.classList.add("hidden");
    this.imgfront.classList.remove("hidden");
    this.imgfront.style.transform = "scale(1.5)";
  }

  removeHoverStyle() {
    this.parent.style.background = "";
    this.imgback.classList.remove("hidden");
    this.imgfront.classList.add("hidden");
    this.parent.style.transform = "scale(1)";
  }

  handleEvent(e) {
    switch (e.type) {
      case "mouseenter":
        this.addHoverStyle();
        break;
      case "click":
        this.pokemon["cry"].play();
        break;
      case "mouseleave":
        this.removeHoverStyle();
        break;
    }
  }
}

export default Pokemon;
