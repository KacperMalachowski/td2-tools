import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import Sceneries from "../../data/Sceneries";
import generateTrainNo, { TrainTypes } from "../components/NumberGenerator/generateNumber";

const TrainNumber: NextPage = () => {

  const [startZone, setStartZone] = useState(1);
  const [endZone, setEndZone] = useState(1);
  const [trainType, setTrainType] = useState(TrainTypes.Ekspres);

  console.log(trainType)


  return (
    <form>
      <label>
        Sceneria Początkowa:
        <select name="start-zone" value={startZone} onChange={(e) => setStartZone(Number.parseInt(e.target.value))}>
          {Sceneries.map((e,i) => (
            <option key={e.name} value={i}>{e.name}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Sceneria Końcowa:
        <select name="end-zone" value={endZone} onChange={(e) => setEndZone(Number.parseInt(e.target.value))}>
          {Sceneries.map((e,i) => (
            <option key={e.name} value={i}>{e.name}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Typ pociągu:
        <select name="train-type"value={TrainTypes[trainType]} onChange={(e) => setTrainType(TrainTypes[e.target.value])}>
          { Object.keys(TrainTypes).filter((el) => { return isNaN(Number(el)) }).map((key: any) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </label>
      <br />
      Twój numer na dziś to: {generateTrainNo(Sceneries[startZone].construtionZone,Sceneries[endZone].construtionZone,trainType)}
    </form>
  )
}

export default TrainNumber;