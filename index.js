import Personer from "./persons.js";
import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });


const personLista = new Personer();

function remove() {
  console.log()
  personLista.skrivUtPersoner();
  const val = prompt("Ange index numret på det du vill ta bort! ->");

  if (Number(val).toString() === "NaN") {
    console.log("Måste skriva in ett tal!");
  }
  if (val <= personLista.getLength() && val >= 1) {
    personLista.removePersonFromList(Number(val) - 1);
  } else {
    console.log(`Talet måste vara mellan 1 och ${personLista.getLength()}`);
  }
}


let run = true;

while (run) {
  console.clear()
  console.log('');
  console.log('Meny Musik och band databasen');
  console.log('');
  console.log('1. Skapa ett band');
  console.log('2. Ta bort ett band');
  console.log('3. Skapa en musiker');
  console.log('4. Ta bort en musiker');
  console.log('5. Lägg till en musiker till ett band');
  console.log('6. Ta bort en musiker från ett band');
  console.log('7. Skriv ut inlaggda musiker och band');
  console.log('8. Avsluta programmet');
  console.log('');

  let val = prompt('Välj ett meny val: ');


  switch (val) {

    case "1":
      console.clear()
      const nameofband = prompt('Ange namnet på bandet: ');
      const yearstarted = Number(prompt('Ange årtalet som bandet skapades: '));
      if (!isNaN(yearstarted)) {
        personLista.addBandToList(nameofband, yearstarted);
      } else {
        prompt('Ogiltigt inmatning av år ange ett tal!, Tryck enter för att återgå till menyn.')

      }
      break;


    case "2":
      remove();
      break;


    case "3":
      console.clear()
      const nameofartist = prompt('Ange namnet på musikanten: ');
      const yearbirth = Number(prompt('Ange födelse året: '));
      const instrument = prompt('Ange vilket instrument musikern använder: ');
      if (!isNaN(yearbirth)) {
        personLista.addMusikerToList(nameofartist, yearbirth, instrument);
      } else {
        prompt('Ogiltigt inmatning av år ange ett tal!, Tryck enter för att återgå till menyn.')
      }
      break;

    case "4":
      remove();
      break;


    case "5":
      console.clear()
      personLista.skrivUtPersoner();
      console.log()
      const musikerIndex = Number(prompt('Ange numret för musikanten i listan som skall läggas till ett band: ')) - 1;
      const bandIndex = Number(prompt('Ange numret som bandet har i listan: ')) - 1;

      if (!isNaN(musikerIndex && bandIndex) && musikerIndex < personLista.getLength() && bandIndex < personLista.getLength()) {
        personLista.addMusikerToBand(musikerIndex, bandIndex);
      } else {
        prompt("Ogiltigt inmatning du angav ett tal som inte är inom giltigt område."); ''
      }

      prompt('Tryck enter för att återgå till menyn')
      break;


    case "6":
      console.clear();
      personLista.skrivUtPersoner();
      console.log()
      const musikerIndexToRemove = Number(prompt('Ange numret för musikanten som ska tas bort från ett band: ')) - 1;
      const bandIndexToRemoveFrom = Number(prompt('Ange numret som bandet har i listan: ')) - 1;

      if (!isNaN(musikerIndexToRemove && bandIndexToRemoveFrom) && musikerIndexToRemove < personLista.getLength() && bandIndexToRemoveFrom < personLista.getLength()) {
        const removedMusiker = personLista.removeMusikerFromBand(musikerIndexToRemove, bandIndexToRemoveFrom);
        console.log(`Musikern "${removedMusiker}" har tagits bort från bandet.`);
      }
      else {
        console.log("Ogiltig inmatning. Ange ett giltigt nummer för musiker och band.");
      }

      prompt('Tryck enter för att återgå till menyn');
      break;

    case "7":
      console.clear()
      personLista.skrivUtPersoner(); // 
      prompt('Tryck enter för att återgå till menyn')
      break;


    case "8":
      run = false;
      break;


    default:
      console.log('Ogiltigt meny val försök igen!');
      prompt('Tryck enter för att återgå till menyn')
      break;

  }

}