import React, { ChangeEvent } from "react";
import { Helmet } from 'react-helmet';
import { APIResponseNumbers, DatabaseAPI, NumbersData } from "../apis/DataBase";
import Sceneries from "../data/Sceneries";

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

  private activeNumbers: NumbersData[] = []
  private sceneriesData = Sceneries;

  constructor(props: any) {
    super(props);

    this.state = {
      startZone: 1,
      endZone: 2,
      trainType: TrainTypes.Express,
      trainNumber: "1350",
      errors: []
    }

    this.handleChange = this.handleChange.bind(this);

    DatabaseAPI.getNumbers()
      .then((d: APIResponseNumbers) => {
        this.activeNumbers = d.message;
      })

    setInterval(() => {
      DatabaseAPI.getNumbers()
      .then((d: APIResponseNumbers) => {
        this.activeNumbers = d.message
      })
    }, 12960000)
  }

  componentDidMount() {
    this.selectNumber();
  }

  
  selectNumber() {
    let number = "";

    number += this.getCOnstructionZoneFromIndex(this.state.startZone);
    number += this.getCOnstructionZoneFromIndex(this.state.endZone);

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

    if (this.activeNumbers.some(v => v.trainNo.toString() == number)) {
      console.error(`Numer ${number} używany! Generuje następny...`);
      this.selectNumber();
    } else {
      this.setState({trainNumber: number});
    }
  }

  async handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.name == "startZone") {
      this.setState({ startZone: Number.parseInt(event.target.value) });
    }

    if (event.target.name == "endZone") {
      this.setState({ endZone: Number.parseInt(event.target.value) });
    }

    if (event.target.name == "trainType") {
      this.setState({ trainType: Number.parseInt(event.target.value) });
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
            Sceneria początkowa:
            <select name="startZone" value={this.state.startZone} onChange={this.handleChange}>
              {this.sceneriesData.sort((a, b) => {
                return a.name < b.name ?  -1 : 1;
              }).map((scenery, i) => (
                <option key={i} value={i}>{scenery.name}</option>
              ))}
            </select>
          </label> <br />
          <label>
            Sceneria końcowa:
            <select name="endZone" value={this.state.endZone} onChange={this.handleChange}>
              {this.sceneriesData.sort((a, b) => {
                return a.name < b.name ?  -1 : 1;
              }).map((scenery, i) => (
                <option key={i} value={i}>{scenery.name}</option>
              ))}
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

  private getCOnstructionZoneFromIndex(index: number) {
    return this.sceneriesData.find((d, i) => i == index)?.construtionZone;
  }
}
