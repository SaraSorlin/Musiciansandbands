
export class Band {

  #name;
  #info;
  #yearstarted;
  #yearended;
  #current;
  #earlier;

  constructor(name, info='', yearstarted= '', yearended= '') {
    this.#name = name;
    this.#info = info;
    this.#yearstarted = yearstarted;
    this.#yearended = null;
    this.#current = [];
    this.#earlier = [];
  }

}

export class Musiker extends Band {

  #yearbirth;
  #instrumentations;

  constructor(name, yearbirth) {
    super(name, null);
    this.#yearbirth = yearbirth;
    this.#instrumentations = [];
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


}
