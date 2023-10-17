
import fs from 'fs';
// import Personer from "./persons.js";

import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });



while (true) {
  console.clear();

  console.log('Meny Musik databasen');
  console.log(''); // Empty line

  console.log('1. Skapa ett band');
  console.log('2. Ta bort ett band');
  console.log('3. Skapa en musiker');
  console.log('4. Ta bort en musiker');
  console.log('5. Lägg till en musiker i ett band');
  console.log('6. Ta bort en musiker från ett band');
  console.log('7. Skriv ut musiker och band');
  console.log('8. Avsluta programmet');

  console.log(''); // Empty line
  let val = prompt('Välj ett alternativ: ');


  switch (val) {
    
    case "1": // Lägg till ett band i databasen
      const nameofband = prompt('Ange namnet på bandet: ');
      const yearstarted = Number(prompt('Ange årtalet bandet skapades: '));
      
      break;
      
    case "2":   // Ta bort ett band i databasen

    break;
    
    case "3": // Skapa en musiker i databasen
    const nameofartist = prompt('Ange namnet på musikern: ');
    const yearbirth = Number(prompt('Ange årtalet när artisten är född [19xx]: '))
    
    break;


    case "4":   // Ta bort en musiker ifrån databasen
    break;

    case "5": // Lägg till musiker i ett band

      break;
    

    case "6": // Tabort en musiker ifrån ett band
      break;
    

    case "7": // Skriv ut alla musiker och band


    case "8": // Avsluta programet
      console.log('Avslutar programmet');
      
      break;

  default:
    console.log('Ogiltigt val, försök igen!');
    break;  
          
  }   
  

}

