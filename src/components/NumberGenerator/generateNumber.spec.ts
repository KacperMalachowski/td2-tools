import Sceneries from "../../../data/Sceneries";
import generateTrainNo, { TrainTypes } from "./generateNumber";

type NumberTestTuple = [number, number, TrainTypes, RegExp]
type ZoneTestTuple = [number, number, RegExp]

const numberCases: NumberTestTuple[] = [
  [9, 9, TrainTypes.Ekspres, /^(89|92|98)[0-9]{2}$/],
  [3, 6, TrainTypes.Luz, /^365[0-8][0-9][0-9]$/],
  [3, 6, TrainTypes.Zdawczy, /^363[0-8][0-9][0-9]$/],
  [4, 2, TrainTypes.Osobowy, /^42[2-9][0-9][0-9]$/],
]

describe("Generate Train Number Tests", () => {
  it.each<NumberTestTuple>(numberCases)("given start zone %p, end zone %p and type %s return %s", (startZone, endZone, trainType, expected) => {

    const actual = generateTrainNo(startZone, endZone, trainType);

    expect(actual.toString()).toMatch(expected);
  })
});