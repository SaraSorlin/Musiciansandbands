import fs from "fs";
import Band from "./Band.js";
import Musiker from "./Musiker.js";

export default class Personer {
  #persons = [];

  constructor() {
    this.#fetchData();
  }

  get persons() {
    return this.#persons;
  }


  #fetchData() {
    const jsonString = fs.readFileSync("database.json");
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      if (data[i].Info === "Band") {
        this.#persons.push(new Band(data[i].Name, data[i].Yearstarted, data[i].Yearended, data[i].Current, data[i].Earlier));
      } else if (data[i].Info === "Musiker") {
        this.#persons.push(new Musiker(data[i].Name, data[i].Yearbirth, data[i].Instrument, data[i].Current, data[i].Earlier));
      }
    }
  }

  skrivUtPersoner() {
    const year = new Date().getFullYear()

    for (let i = 0; i < this.#persons.length; i++) {
      const person = this.#persons[i];

      console.log(`${i + 1}. Namn: ${person.name}`);
      console.log(`   Information: ${person.info}`);

      if (person instanceof Musiker) {
        console.log(`   Född: ${person.yearbirth}`);
        console.log(`   Ålder: ${year - person.yearbirth}`);
        console.log(`   Instrument: ${person.instruments}`);
      } else if (person instanceof Band) {
        console.log(`   Bildades: ${person.yearstarted}`);
        console.log(`   Upplöstes: ${person.yearended || ''}`);
      }
      console.log(`   Medlem: ${person.current.join(', ') || 'Inga'}`);
      console.log(`   Tidigare: ${person.earlier.join(', ') || 'Inga'}`);
      console.log('');
    }
  }

  addMusikerToList(namemusiker, yearbirth, instrument) {
    this.#persons.push(new Musiker(namemusiker, yearbirth, instrument));
    this.#updateJsonFile();
  }

  addBandToList(nameband, yearstarted) {
    this.#persons.push(new Band(nameband, yearstarted));
    this.#updateJsonFile();
  }

  addMusikerToBand(musikerIndex, bandIndex) {
    const year = new Date().getFullYear()
    const band = this.#persons[bandIndex];
    const musiker = this.#persons[musikerIndex];


    if (!band.current.includes(musiker.name)) {
      band.current.push(`Namn:${musiker.name} Instrument:${musiker.instruments} År:${year}`);
    }

    if (!musiker.current.includes(band.name)) {
      musiker.current.push(band.name);
    }
    else
      console.log(`${musiker.name} är redan medlem i bandet ${band.name}.`);

    this.#updateJsonFile();
  }

  removeMusikerFromBand(musikerIndex, bandIndex) {
    const year = new Date().getFullYear();
    const band = this.#persons[bandIndex];
    const musiker = this.#persons[musikerIndex];

    if (band && musiker) {
      const musikerIndexInCurrent = band.current.findIndex(member => member.includes(musiker.name));

      if (musikerIndexInCurrent !== -1) {
        const memberInfo = band.current[musikerIndexInCurrent];
        const [, musikerName, instruments] = memberInfo.match(/Namn:(.*) Instrument:(.*) År:/);

        band.current.splice(musikerIndexInCurrent, 1);

        band.earlier.push(`Namn:${musikerName} Instrument:${instruments} År:${year}`);
        musiker.current.splice(musiker.current.indexOf(band.name), 1);

        musiker.earlier.push(band.name);

        if (band.current.length === 0) {
          band.yearended = year;
        }

        this.#updateJsonFile();
      }
      else {
        console.log(`${musiker.name} är inte medlem i ${band.name}.`);
        return null;
      }
    } else {
      console.log("Ogiltig inmattning!, ange ett giltigt index nummer.");
      return null;
    }
  }


  removePersonFromList(index) {
    const remove = this.#persons[index];

    if (remove instanceof Musiker) {

      for (const person of this.#persons) {
        if (person instanceof Band) {
          const currentIdx = person.current.findIndex(member => member.includes(remove.name));
          if (currentIdx !== -1) {
            const [, musikerName, instruments] = person.current[currentIdx].match(/Namn:(.*) Instrument:(.*) År:/);
            person.current.splice(currentIdx, 1);
            person.earlier.push(`Namn:${musikerName} Instrument:${instruments} År:${new Date().getFullYear()}`);
          }
        }
      }
    }
    else if (remove instanceof Band) {

      for (const person of this.#persons) {
        if (person instanceof Musiker) {
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
    }

    this.#persons.splice(index, 1);
    this.#updateJsonFile();
  }

  getLength() {
    return this.#persons.length;
  }

  #updateJsonFile() {
    let tempList = [];

    for (let i = 0; i < this.#persons.length; i++) {

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