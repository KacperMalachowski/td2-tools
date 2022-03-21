export enum TrainTypes {
  "Ekspres",
  "Pośpieszny",
  "Osobowy przyśpieszony",
  "Osobowy",
  "Towarowy",
  "Zdawczy",
  "Luz",
  "Służbowy",
  "Gospodarczy"
}


const generateTrainNo = (startZone: number, endZone: number, trainType: TrainTypes): number => {
  const zoneID = generateZonesID(startZone, endZone);
  console.debug(startZone, endZone, trainType);
  
  switch (trainType) {
    case TrainTypes.Ekspres:
      return (zoneID * 100) + Math.floor(getRandomNumber(0, 99));
    case TrainTypes.Pośpieszny:
    case TrainTypes["Osobowy przyśpieszony"]:
      return (zoneID * 1000) + Math.floor(getRandomNumber(50, 169));
    case TrainTypes.Osobowy:
      return (zoneID * 1000) + Math.floor(getRandomNumber(200, 999));
    case TrainTypes.Towarowy:
      return (zoneID * 10000) + 4000 + Math.floor(getRandomNumber(0, 899));
    case TrainTypes.Zdawczy:
      return (zoneID * 10000) + 3000 + Math.floor(getRandomNumber(0, 899));
    case TrainTypes.Luz:
      return (zoneID * 10000) + 5000 + Math.floor(getRandomNumber(0, 899));
    case TrainTypes.Służbowy:
      return (zoneID * 10000) + 6000 + Math.floor(getRandomNumber(0, 899));
    case TrainTypes.Gospodarczy:
      return (zoneID * 10000) + 9000 + Math.floor(getRandomNumber(0, 899));
  }
}

const generateZonesID = (startZone: number, endZone: number): number => {
  if (startZone != endZone)
    return (startZone * 10) + endZone;
  else 
    switch (startZone) {
      case 1:
        return getRandomElement([10,11,19,91,93,97,99]);
      case 2:
        return getRandomElement([20,22,29]);
      case 3:
        return getRandomElement([30,33,39]);
      case 4:
        return getRandomElement([40,44,49,94]);
      case 5:
        return getRandomElement([50,55,59,90,95,96]);
      case 6:
        return getRandomElement([66,60,69]);
      case 7:
        return getRandomElement([77,70,79]);
      case 8:
        return getRandomElement([88,80]);
      case 9:
        return getRandomElement([89,92,98]);
      default:
        return -1;
    }
}

const getRandomElement = <T>(item: Array<T>) => {
  return item[Math.floor(Math.random() * item.length)];
}

const getRandomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
}



export default generateTrainNo;