
export default class Band {

  #name;
  #info;
  #yearstarted;
  #yearended;
  #current;
  #earlier;

  constructor(name, yearstarted = '', yearended = '') {
    this.#name = name;
    this.#info = 'Band';
    this.#yearstarted = yearstarted;
    this.#yearended = yearended;
    this.#current = [];
    this.#earlier = [];
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }


  get information() {
    return this.#info;
  }

  set information(newinfo) {
    this.#info = newinfo;
  }

  get yearstarted() {
    return this.#yearstarted;
  }

  set yearstarted(newyearstart) {
    this.#yearstarted = newyearstart;
  }


  get yearended() {
    return this.#yearended;
  }

  set yearended(newyear) {
    this.#yearended = newyear;
  }

  get current() {
    return this.#current;

  }

  set current(newcurrent) {
    this.#current.push(newcurrent);
  }

  get earlier() {
    return this.#earlier;
  }

  set earlier(newearlier) {
    this.#earlier.push(newearlier);
  }


  // Skapar ett objekt med bandets egenskaps information. 
  // Används när vi ska skicka in till "databasen.json". 
  databandInfo() {
    return {
      Name: this.#name,
      Info: this.#info,
      Yearstarted: this.#yearstarted,
      Yearended: this.#yearended,
      Current: this.#current,
      Earlier: this.#earlier,

    };
  }
}