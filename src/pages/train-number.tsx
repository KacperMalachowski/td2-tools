import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import Sceneries from "../../data/Sceneries";
import generateTrainNo, { TrainTypes } from "../components/NumberGenerator/generateNumber";
import styles from '../styles/Home.module.css';

const TrainNumber: NextPage = () => {

  const [startZone, setStartZone] = useState(1);
  const [endZone, setEndZone] = useState(1);
  const [trainType, setTrainType] = useState(TrainTypes.Ekspres);

  console.log(trainType)


  return (
    <main className={styles.main}>
      <form className={styles.card}>
        <label style={{ display: "block" }}>
          Sceneria Początkowa:
          <select name="start-zone" value={startZone} onChange={(e) => setStartZone(Number.parseInt(e.target.value))}>
            {Sceneries.map((e,i) => (
              <option key={e.name} value={i}>{e.name}</option>
            ))}
          </select>
        </label>
        <label style={{ display: "block" }}>
          Sceneria Końcowa:
          <select name="end-zone" value={endZone} onChange={(e) => setEndZone(Number.parseInt(e.target.value))}>
            {Sceneries.map((e,i) => (
              <option key={e.name} value={i}>{e.name}</option>
            ))}
          </select>
        </label>
        <label style={{ display: "block" }}>
          Typ pociągu:
          <select name="train-type"value={TrainTypes[trainType]} onChange={(e) => setTrainType(TrainTypes[e.target.value])}>
            { Object.keys(TrainTypes).filter((el) => { return isNaN(Number(el)) }).map((key: any) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </label>
        <span style={{ display: "block" }}>Twój numer na dziś to: {generateTrainNo(Sceneries[startZone].construtionZone,Sceneries[endZone].construtionZone,trainType)}</span>
      </form>
    </main>
  )
}

export default TrainNumber;