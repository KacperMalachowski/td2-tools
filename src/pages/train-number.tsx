import React, { ChangeEvent } from "react";
import { Helmet } from 'react-helmet';
import { TrainData, TrainDriverAPI as TDAPI} from '../apis/TrainDriver';

enum Zones {
  Warszawa,
  Lublin,
  Kraków,
  Sosnowiec,
  Gdańsk,
  Wrocław,
  Poznań,
  Szczecin
}

enum TrainTypes {
  Express,
  Pośpieszny,
  "Osobowy Przyśpieszony",
  Osobowy,
  Służbowy,
  Towarowy,
  Zdawczy,
  Luz
}

export default class TrainNumber extends React.Component<{}, {startZone: Zones, endZone: Zones, trainType: TrainTypes, trainNumber: string, errors: string[]}> {

  private activeNumbers: TrainData[] = [{ trainNo: 1303, driverName: "Kacper9"}]

  constructor(props: any) {
    super(props);

    this.state = {
      startZone: Zones.Warszawa,
      endZone: Zones.Kraków,
      trainType: TrainTypes.Express,
      trainNumber: "1350",
      errors: []
    }

    this.handleChange = this.handleChange.bind(this);

    TDAPI.getTrains()
    .then(d => {
      this.activeNumbers = d.message;
    });

    setInterval(() => {
      TDAPI.getTrains()
        .then(d => {
          this.activeNumbers = d.message;
        });
    }, 180000)
  }

  componentDidMount() {
    this.selectNumber();
  }

  selectNumber() {
    let number = "";

    number += this.state.startZone + 1;
    number += this.state.endZone + 1;

    switch (this.state.trainType) {
      case TrainTypes.Express:
        let min = Math.ceil(0);
        let max = Math.floor(99);

        let result = Math.floor(Math.random() * (max - min)) + min;
        var s = "00" + result;
        number += s.substring(s.length - 2);
        break;
      
      case TrainTypes.Pośpieszny:
      case TrainTypes["Osobowy Przyśpieszony"]:
        min = Math.ceil(50);
        max = Math.floor(169);

        result = Math.floor(Math.random() * (max - min)) + min;
        var s = "000" + result;
        number += s.substring(s.length - 3);
        break;
      case TrainTypes.Osobowy:
        min = Math.ceil(200);
        max = Math.floor(999);

        result = Math.floor(Math.random() * (max - min)) + min;
        var s = "000" + result;
        number += s.substring(s.length - 3);
        break;

      case TrainTypes.Służbowy:
        number += "6";

        
        min = Math.ceil(0);
        max = Math.floor(899);

        result = Math.floor(Math.random() * (max - min)) + min;
        var s = "000" + result;
        number += s.substring(s.length - 3);
        break;

      case TrainTypes.Towarowy:
        number += "4"
        
        min = Math.ceil(0);
        max = Math.floor(899);

        result = Math.floor(Math.random() * (max - min)) + min;
        var s = "000" + result;
        number += s.substring(s.length - 3);
        break;

      case TrainTypes.Zdawczy:
        number += "3";
        
        min = Math.ceil(0);
        max = Math.floor(899);

        result = Math.floor(Math.random() * (max - min)) + min;
        var s = "000" + result;
        number += s.substring(s.length - 3);
        break;

      case TrainTypes.Luz:
        number += "5";  

        min = Math.ceil(0);
        max = Math.floor(899);

        result = Math.floor(Math.random() * (max - min)) + min;
        var s = "000" + result;
        number += s.substring(s.length - 3);
        break;

    }

    if (this.activeNumbers.some(v => v.trainNo == Number.parseInt(number))) {
      console.error(`Numer ${number} używany! Generuje następny...`);
      this.selectNumber();
    } else {
      this.setState({trainNumber: number});
    }
  }

  async handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.name == "startZone") {
      await this.setState({ startZone: Number.parseInt(event.target.value)});
    }

    if (event.target.name == "endZone") {
      await this.setState({ endZone: Number.parseInt(event.target.value)});
    }

    if (event.target.name == "trainType") {
      await this.setState({ trainType: Number.parseInt(event.target.value)});
    }

    this.selectNumber();
  }

  handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
  }

  render() {
    return (
      <main>
        <Helmet htmlAttributes={{ lang: 'pl' }}>
          <title>Train number selector</title>
        </Helmet>
        <form>
          <label>
            Okręg startu:
            <select name="startZone" value={this.state.startZone} onChange={this.handleChange}>
              <option value={Zones.Warszawa}>Warszawa</option>
              <option value={Zones.Lublin}>Lublin</option>
              <option value={Zones.Kraków}>Kraków</option>
              <option value={Zones.Sosnowiec}>Sosnowiec</option>
              <option value={Zones.Gdańsk}>Gdańsk</option>
              <option value={Zones.Wrocław}>Wrocław</option>
              <option value={Zones.Poznań}>Poznań</option>
              <option value={Zones.Szczecin}>Szczecin</option>
            </select>
          </label> <br />
          <label>
            Okręg końca:
            <select name="endZone" value={this.state.endZone} onChange={this.handleChange}>
              <option value={Zones.Warszawa}>Warszawa</option>
              <option value={Zones.Lublin}>Lublin</option>
              <option value={Zones.Kraków}>Kraków</option>
              <option value={Zones.Sosnowiec}>Sosnowiec</option>
              <option value={Zones.Gdańsk}>Gdańsk</option>
              <option value={Zones.Wrocław}>Wrocław</option>
              <option value={Zones.Poznań}>Poznań</option>
              <option value={Zones.Szczecin}>Szczecin</option>
            </select>
          </label> <br />
          <label>
            Typ pociągu:
            <select name="trainType" value={this.state.trainType} onChange={this.handleChange}>
              <option value={TrainTypes.Express}>Express</option>
              <option value={TrainTypes.Pośpieszny}>Pośpieszny</option>
              <option value={TrainTypes["Osobowy Przyśpieszony"]}>Osobowy Przyśpieszony</option>
              <option value={TrainTypes.Osobowy}>Osobowy</option>
              <option value={TrainTypes.Służbowy}>Służbowy</option>
              <option value={TrainTypes.Towarowy}>Towarowy</option>
              <option value={TrainTypes.Zdawczy}>Zdawczy</option>
              <option value={TrainTypes.Luz}>Luz</option>
            </select>
          </label>
        </form>
        <label>Twój numer pociagu to: {this.state.trainNumber}</label> <br />
        {this.state.errors.map(e => 
          (
            <span>{e}</span>
          ))}
        <button onClick={() => this.selectNumber()}>Generuj</button>
      </main>
    );
  }
}
