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
    const pkmtypes = {
      grass: "linear-gradient(to top, #032911, #065316)",
      fire: "linear-gradient(to top, #290403, #99330c)",
      normal: "linear-gradient(to top, #290403, #99330c)",
      water: "linear-gradient(to top, #031a29, #066da1)",
      poison: "linear-gradient(to top, #120329, #260653)",
      ghost: "linear-gradient(to top, #000005, #230057)",
      rock: "linear-gradient(to top, #21160a, #4f3518)",
      dragon: "linear-gradient(to top, #031a29, #063253)",
      bug: "linear-gradient(to top, #232903, #495306)",
      ground: "linear-gradient(to top, #63411a, #ba7d36)",
      electric: "linear-gradient(to top, #292603, #a19406)",
      fighting: "linear-gradient(to top, #170000, #4a0000)",
      psychic: "linear-gradient(to top, #29031c, #a1067d)",
      fairy: "linear-gradient(to top, #5b345c, #f08af2)",
      ice: "linear-gradient(to top, #003b37, #00a69e)",
      flying: "linear-gradient(to top, #290403, #003b37)",
    };

    this.parent.style.background = pkmtypes[this.pokemon["type"]];
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
    /*
    let allEvents = {
      "mouseenter": this.addHoverStyle.bind(),
      "click": this.pokemon["cry"].play.bind(),
      "mouseleave": this.removeHoverStyle.bind()
    }
  
    allEvents[e.type]();
    */
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
