import fs from "fs";
import Hund from "./person.js";

export default class Hundar {
  #hundLista = []; // Lista som håller alla hund-objekt.

  constructor() {
    this.#fetchHundData();
  }

  get hundLista() {
    return this.#hundLista;
  }

  // Läser in alla hundar från "Hundar.json". 
  #fetchHundData() {
    const jsonString = fs.readFileSync("hundar.json");
    const data = JSON.parse(jsonString);

    // Populerar #hundLista med hund-objekt, då kommer vi få tillgång till alla metoder i Hund-klassen.
    for (let i = 0; i < data.length; i++) {
      this.#hundLista.push(new Hund(data[i].name, data[i].checkedIn));
    }
  }

  //Skriver ut index och hund-objektens namn 
  skrivUtHundar() {
    for (let i = 0; i < this.#hundLista.length; i++) {
      console.log(`${i + 1}. ${this.#hundLista[i].name}`);
    }
  }

  //Skriver ut index, hund-objektens namn och ifall dem är incheckade eller inte
  skrivUtHundarMedCheckIn() {
    for (let i = 0; i < this.#hundLista.length; i++) {
      console.log(`${i + 1}. ${this.#hundLista[i].name} -> ${this.#hundLista[i].checkedIn}`);
    }
  }


  addDogToList(name) {
    this.#hundLista.push(new Hund(name)); // Lägger till en ny hund i #hundLista.
    this.#updateJsonFile(); // Uppdaterar "Hundar.json".
  }

  removeDogFromList(index) {
    this.#hundLista.splice(index, 1); // Tar bort en hund ifrån #hundLista.
    this.#updateJsonFile(); // Uppdaterar "Hundar.json".
  }

  #updateJsonFile() {
    let tempList = []; // Skapar en temporär lista som ska sparas i "hundar.json".

    for (let i = 0; i < this.#hundLista.length; i++) {
      // Använder dataInfo som ger mig ett nytt objekt med alla hund-objektet egenskaps information.
      // Om vi sparar hund-objektet direkt, kommer inte informationen från privata egenskaper med.
      tempList.push(this.#hundLista[i].dataInfo());
    }

    fs.writeFileSync('./hundar.json', JSON.stringify(tempList, null, 2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
  }

  checkInDog(index) {
    this.#hundLista[index].checkInAndOut(); // Ändrar så en hund blir incheckad eller checkar ut.  
    this.#updateJsonFile();
  }

  getLength() {
    return this.#hundLista.length;
  }
} 