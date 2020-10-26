export function getPosition (ultraPosition: number) {
  let position: String = '';
  switch(ultraPosition) {
    case 10: {
      position = 'Gardien';
      break;
    }
    case 20: {
      position = 'Défenseur';
      break;
    }
    case 21: {
      position = 'Latéral';
      break;
    }
    case 31: {
      position = 'Milieu défensif';
      break;
    }
    case 32: {
      position = 'Milieu offensif';
      break;
    }
    case 40: {
      position = 'Attaquant';
      break;
    }
  }
  return position;
}