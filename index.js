import Personer from "./persons.js";
import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });

// När vi skapar ett nytt objekt kommer constructor att
// läsa in musiker och band från JSON-filen. 
const personLista = new Personer();

function remove() {
  personLista.skrivUtPersoner();
  const val = prompt("Enter the index of the one you want to remove ->");

  if (Number(val).toString() === "NaN") { // Kollar så att val går att parsa till ett nummer.
    console.log("Måste skriva in ett tal!");
  }
  if (val <= personLista.getLength() && val >= 1) {
    personLista.removePersonFromList(Number(val) - 1); // Tar det inskrivna valet och minskar med 1. (för arrays index börjar på 0)
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

  let val = prompt('Välj ett meny vall: ');


  switch (val) {

    case "1": // Skapa ett band
      console.clear()
      const nameofband = prompt('Ange namnet på bandet: ');
      const yearstarted = Number(prompt('Ange årtalet som bandet skappades: '));
      if (!isNaN(yearstarted)) {
        personLista.addBandToList(nameofband, yearstarted);
      } else {
        prompt('Ogiltigt inmatning av år ange ett tal!, Tryck enter för att återgå till menyn.')

      }
      break;


    case "2": // Ta bort ett band
      remove();
      break;


    case "3": // Skapa en musiker
      console.clear()
      const nameofartist = prompt('Ange namnet på musikanten: ');
      const yearbirth = Number(prompt('Ange födelse året: '));
      if (!isNaN(yearbirth)) {
        personLista.addMusikerToList(nameofartist, yearbirth);
      } else {
        prompt('Ogiltigt inmatning av år ange ett tal!, Tryck enter för att återgå till menyn.')
      }
      break;


    case "4": // Ta bort en musiker
      remove();
      break;


    case "5": // Lägg till en musiker till ett band
      console.clear()
      personLista.skrivUtPersoner();
      const musikerIndex = Number(prompt('Ange numret för musikanten i listan som skall läggas till ett band: ')) - 1; // drar bort 1 då index börjar på 0
      const bandIndex = Number(prompt('Ange numret som bandet har i listan: ')) - 1;

      if (!isNaN(musikerIndex && bandIndex) && musikerIndex < personLista.getLength() && bandIndex < personLista.getLength()) {
        personLista.addMusikerToBand(musikerIndex, bandIndex);
      } else {
        prompt("Ogiltigt inmatning du angav ett tal som inte är inom giltigt område.");
      }

      prompt('Tryck enter för att återgå till menyn')
      break;


    case "6": // Ta bort en musiker ifrån ett band
      console.clear();
      personLista.skrivUtPersoner();

      const musikerIndexToRemove = Number(prompt('Ange numret för musikanten som ska tas bort från ett band: ')) - 1;
      const bandIndexToRemoveFrom = Number(prompt('Ange numret som bandet har i listan: ')) - 1;

      if (!isNaN(musikerIndexToRemove && bandIndexToRemoveFrom) && musikerIndexToRemove < personLista.getLength() && bandIndexToRemoveFrom < personLista.getLength()) {
        const removedMusiker = personLista.removeMusikerFromBand(musikerIndexToRemove, bandIndexToRemoveFrom);
        console.log(`Musikern "${removedMusiker}" har tagits bort från bandet.`);
        console.clear();
        personLista.skrivUtPersoner();
      }
      else {
        console.log("Ogiltig inmatning. Ange ett giltigt nummer för musiker och band.");
      }

      prompt('Tryck enter för att återgå till menyn');
      break;

    case "7": // Skriv ut information om Musiker och band
      console.clear()
      personLista.skrivUtPersoner(); // 
      prompt('Tryck enter för att återgå till menyn')
      break;


    case "8": // Avsluta programmet
      run = false;
      break;


    default:
      console.log('Ogiltigt meny vall försök igen!');
      prompt('Tryck enter för att återgå till menyn')
      break;

  }

}