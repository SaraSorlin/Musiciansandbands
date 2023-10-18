
export default class Musiker {

  #name;
  #info;
  #yearbirth;
  #instrumentations;
  #current;
  #earlier;

  constructor(name, yearbirth = '') {
    this.#name = name;
    this.#info = 'Musiker';
    this.#yearbirth = yearbirth;
    this.#instrumentations = [];
    this.#current = [];
    this.#earlier = [];
  }

  get name() {
    return this.#name;
  }

  set name(newname) {
    this.#name = newname;
  }

  get info() {
    return this.#info;
  }


  get Instrument() {
    return this.#instrumentations;
  }

  set Instrument(newinstrument) {
    this.#instrumentations.push(newinstrument);
  }

  get YearBirth() {
    return this.#yearbirth;
  }

  set YearBirth(newyearbirth) {
    this.#yearbirth = newyearbirth;
  }

  set current(newcurrent) {
    this.#current.push(newcurrent);
  }

  get current() {
    return this.#current;
  }

  set earlier(newearlier) {
    this.#earlier.push(newearlier);
  }

  get earlier() {
    return this.#earlier;
  }

  // Skapar ett objekt med musikerns egenskaps information. 
  // Används när vi ska skicka in till "databasen.json". 

  datamusikerInfo() {
    return {
      Name: this.#name,
      Info: this.#info,
      Yearbirth: this.#yearbirth,
      Instrument: this.#instrumentations,
      Current: this.#current,
      Earlier: this.#earlier,

    };
  }
}