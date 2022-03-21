import { NextPage } from "next";
import Sceneries from "../../data/Sceneries";

enum TrainTypes {
  "Eksprresowy Krajowy (Express)",
  ""
}

const calculateNumber = (startZoneNo: Number, endZoneNo: number, type: TrainTypes): number  => {
  
}

const TrainNumber: NextPage = () => {
  return (
    <form>
      <label>
        Sceneria Początkowa:
        <select name="start-zone">
          {Sceneries.map((e) => (
            <option value={e.construtionZone}>{e.name}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Sceneria Końcowa:
        <select name="end-zone">
          {Sceneries.map((e) => (
            <option value={e.construtionZone}>{e.name}</option>
          ))}
        </select>
      </label>
    </form>
  )
}

export default TrainNumber;