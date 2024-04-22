import smallCave from './caves/small-cave.json';

type CaveChoice = {
  name: string;
  map: number[][];
}

// array of names to maps
const choices: CaveChoice[] = [
  { 
    name: 'smallCave', 
    map: smallCave
  }
];

export class Cave {

  private cave: number[][];

  constructor () {

  }

  caveChoices = (): string[] => {
    return choices.map(map => map.name);
  }

  loadCave = (caveName: string) => {
    const caveFound = choices.find(cc => cc.name === caveName);
    if (caveFound) {
      this.cave = caveFound.map;
    }
  }

  getRoom = (i: number) => {
    return this.cave[i - 1];
  }
}