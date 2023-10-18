import fs from "fs";
import Band from "./Band.js";
import Musiker from "./Musiker.js";

export default class Personer {
  #persons = []; // Listan som håller alla musiker och band

  constructor() {
    this.#fetchData();
  }

  get persons() {
    return this.#persons;
  }

  // Läser in alla musiker och band från "database.json". 
  #fetchData() {
    const jsonString = fs.readFileSync("database.json");
    const data = JSON.parse(jsonString);
    // Populerar #Lista med musiker och band -objekt, då kommer vi få tillgång till alla metoder i klassen.
    for (let i = 0; i < data.length; i++) {
      if (data[i].Info === "Band") {
        this.#persons.push(new Band(data[i].Name, data[i].Yearstarted, data[i].Yearended, data[i].Current, data[i].Earlier));
      } else if (data[i].Info === "Musiker") {
        this.#persons.push(new Musiker(data[i].Name, data[i].Yearbirth, data[i].Instrument, data[i].Current, data[i].Earlier));
      }
    }
  }


  //Skriver ut index och hund-objektens namn 
  skrivUtPersoner() {
    for (let i = 0; i < this.#persons.length; i++) {
      if (this.#persons[i] instanceof Band) {

        console.log(`${i + 1}. Namn: ${this.#persons[i].name},        Information: ${this.#persons[i].info},     Start: ${this.#persons[i].yearstarted},    Slut: ${this.#persons[i].yearended},    Medlemmar: ${this.#persons[i].current},           Tidigare: ${this.#persons[i].earlier}`);
      }
      else if (this.#persons[i] instanceof Musiker) {

        console.log(`${i + 1}. Namn: ${this.#persons[i].name},      Information: ${this.#persons[i].info},  Född: ${this.#persons[i].yearbirth},    Instrument: ${this.#persons[i].instruments},     Medlemmar: ${this.#persons[i].current},           Tidigare: ${this.#persons[i].earlier}`);

      }

    }

  }

  addMusikerToList(namemusiker, yearbirth) {
    this.#persons.push(new Musiker(namemusiker, yearbirth));
    this.#updateJsonFile(); // Uppdaterar "databasen.json". 
  }

  addBandToList(nameband, yearstarted) {
    this.#persons.push(new Band(nameband, yearstarted));
    this.#updateJsonFile(); // Uppdaterar "databasen.json".
  }

  addMusikerToBand(musikerIndex, bandIndex) {

    const band = this.#persons[bandIndex];
    const musiker = this.#persons[musikerIndex];

    // Lägger till musiker i current band
    if (!band.current.includes(musiker.name)) {
      band.current.push(musiker.name);
    }

    // Lägger till bandet i musikerns current band
    if (!musiker.current.includes(band.name)) {
      musiker.current.push(band.name);
    }
    else
      console.log(`${musiker.name} är redan medlem i bandet ${band.name}.`);

    this.#updateJsonFile();
  }

  removeMusikerFromBand(musikerIndex, bandIndex) {
    const band = this.#persons[bandIndex];
    const musiker = this.#persons[musikerIndex];

    if (band && musiker) {
      const musikerIndexIncurrent = band.current.indexOf(musiker.name);
      const bandIndexcurrent = musiker.current.indexOf(band.name);

      if (musikerIndexIncurrent !== -1) {
        band.current.splice(musikerIndexIncurrent, 1);
        musiker.current.splice(bandIndexcurrent, 1);

        band.earlier.push(musiker.name);
        musiker.earlier.push(band.name);
        this.#updateJsonFile();
        return musiker.name;
      } else {
        console.log(`${musiker.name} är inte medlem i bandet ${band.name}.`);
        return null;
      }
    } else {
      console.log("Ogiltig inmatning. Ange giltiga musiker- och bandindex.");
      return null;
    }
  }

  removePersonFromList(index) {
    const remove = this.#persons[index];

    if (remove instanceof Musiker) {
      // Går igenom samtliga arrayer och tarbort namnet ifrån current and earlier lista 
      for (const person of this.#persons) {
        const currentIdx = person.current.indexOf(remove.name);
        if (currentIdx !== -1) {
          person.current.splice(currentIdx, 1);
        }
        const earlierIdx = person.earlier.indexOf(remove.name);
        if (earlierIdx !== -1) {
          person.earlier.splice(earlierIdx, 1);
        }
      }
    }

    this.#persons.splice(index, 1);
    this.#updateJsonFile(); // Updatera "database.json".
  }


  getLength() {
    return this.#persons.length;
  }

  #updateJsonFile() {
    let tempList = []; // Skapar en temporär lista som ska sparas i "databasen.json".

    for (let i = 0; i < this.#persons.length; i++) {
      // Använder dataInfo som ger mig ett nytt objekt med alla musiker och band objektet egenskaps information.
      // Om vi sparar musiker och band-objektet direkt, kommer inte informationen från privata egenskaper med.
      if (this.#persons[i] instanceof Band) {
        tempList.push(this.#persons[i].databandInfo());
      } else if (this.#persons[i] instanceof Musiker) {
        tempList.push(this.#persons[i].datamusikerInfo());
      }
    }

    fs.writeFileSync('./database.json', JSON.stringify(tempList, null, 2));
    console.log('Data basen är uppdaterad med förändringarna');
  }
}
