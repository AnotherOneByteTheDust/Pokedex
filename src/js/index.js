import Pokemon from "./Pokemon.js";
import { Howl, Howler } from "howler";
import Cries from "../assets/cries/*.ogg";
import VanillaTilt from "vanilla-tilt";

// Prueba a crear e insertar valor en la base de datos

var request = window.indexedDB.open("Pokemon", 1);
request.onupgradeneeded = function (event) {
  let db = request.result;
  let objectStore = db.createObjectStore("Pokemon", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: true });
  objectStore.createIndex("type", "type", { unique: false });
  objectStore.createIndex("back", "back", { unique: true });
  objectStore.createIndex("front", "front", { unique: true });
  let transaction = event.target.transaction;

  transaction.oncomplete = function (event) {
    const insert = db.transaction("Pokemon", "readwrite");
    let pokemonOS = insert.objectStore("Pokemon");

    let el = {
      id: "1",
      name: "prueba",
      front: "front",
      back: "back",
      type: "type",
    };
    let request = pokemonOS.add(el);
    request.onsuccess = () => {
      console.log("Objeto añadido");
    };
    request.onerror = () => {
      console.log("Error");
    };
  };
};

// Crear promesa con todos los fetchs necesarios

let storage = window.localStorage.getItem("1");
const numPokemon = 151;
const parsedMons = {};

if (!storage) {
  const array = [];

  for (let i = 1; i <= numPokemon; i++) {
    array.push(
      new Promise((resolve, reject) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then(function (response) {
            resolve(response.json());
          })
          .catch(function (response) {
            reject(response);
          });
      })
    );
  }

  // Lanzar fetch y generar todos los pokemon

  Promise.all(array).then((pokemons) => {
    let aux = {};
    let cry;

    for (let pokemon of pokemons) {
      aux = {};
      cry = new Howl({
        src: [Cries[pokemon["id"]]],
        volume: 0.7,
      });

      aux["name"] = pokemon["name"].toUpperCase();
      aux["front"] = pokemon["sprites"]["front_default"];
      aux["back"] = pokemon["sprites"]["back_default"];
      aux["type"] =
        pokemon["types"][1] == undefined
          ? pokemon["types"][0]["type"]["name"]
          : pokemon["types"][1]["type"]["name"];
      aux["cry"] = cry;
      parsedMons[pokemon["id"]] = aux;
      let str =
        aux["name"] +
        "::" +
        aux["front"] +
        "::" +
        aux["back"] +
        "::" +
        aux["type"];

      window.localStorage.setItem(pokemon["id"], str);
    }

    let keys = Object.keys(parsedMons);

    for (let i of keys) {
      new Pokemon(parsedMons[i], i);
    }
  });
} else {
  for (let i = 1; i <= numPokemon; i++) {
    let str = window.localStorage.getItem(i);
    str = str.split("::");
    let aux = {};

    let cry = new Howl({
      src: [Cries[i]],
      volume: 0.7,
    });

    aux["name"] = str[0];
    aux["front"] = str[1];
    aux["back"] = str[2];
    aux["type"] = str[3];
    aux["cry"] = cry;
    parsedMons[i] = aux;
  }
  let keys = Object.keys(parsedMons);

  for (let i of keys) {
    new Pokemon(parsedMons[i], i);
  }
}
