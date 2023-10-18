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
    console.log(`The number must be between 1 and ${personLista.getLength()}`);
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
  console.log('8. Avsluta programmet'); a
  console.log('');

  let val = prompt('Välj ett meny vall: ');


  switch (val) {


    case "1": // Skapa ett band
      const nameofband = prompt('Ange namnet på bandet: ');
      const yearstarted = Number(prompt('Ange årtalet som bandet skappades: '));
      if (!isNaN(yearstarted)) {
        personLista.addBandToList(nameofband, yearstarted);
      } else {
        console.log("Ogiltigt inmatning av år ange ett tal.");
      }
      break;

    case "2": // Ta bort ett band
      remove();
      break;

    case "3": // Skapa en musiker
      const nameofartist = prompt('Ange namnet på musikanten: ');
      const yearbirth = Number(prompt('Ange födelse året: '));
      if (!isNaN(yearbirth)) {
        personLista.addMusikerToList(nameofartist, yearbirth);
      } else {
        console.log("Ogiltigt inmatning av år ange ett tal.");
      }
      break;

    case "4": // Ta bort en musiker
      remove();
      break;

    case "5": // Lägg till en musiker till ett band

      break;



    case "6": // Ta bort en musiker ifrån ett band

      break;

    case "7": // Skriv ut inlaggda musiker och band
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