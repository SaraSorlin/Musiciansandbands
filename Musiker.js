
export default class Musiker {

  #name;
  #info;
  #yearbirth;
  #instruments;
  #current;
  #earlier;

  constructor(name, yearbirth, instruments, current, earlier) {
    this.#name = name;
    this.#info = 'Musiker';
    this.#yearbirth = yearbirth;
    this.#instruments = [instruments];
    this.#current = [current];
    this.#earlier = [earlier];
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

  set info(newinfo) {
    return this.#info = newinfo;
  }


  get instruments() {
    return this.#instruments;
  }

  set instruments(newinstrument) {
    this.#instruments.push(newinstrument);
  }

  get yearbirth() {
    return this.#yearbirth;
  }

  set yearbirth(newyearbirth) {
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
      Instrument: this.#instruments,
      Current: this.#current,
      Earlier: this.#earlier
    };

  }
}