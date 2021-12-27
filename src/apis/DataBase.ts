import Sceneries from "../data/Sceneries";

export type SceneryData = {
  Name: string,
  "Construction Zone": number
};

export type NumbersData = {
  trainNo: number,
  driverId: number,
  driverName: string,
  driverIsSupporter: boolean,
  dataSignal: string,
  daCon: string,
  dataMass: string
}

export type APIResponseSceneries = {
  records: [
    {
      id: string,
      fields: SceneryData,
      createdTime: string,
    }
  ]
};


export type APIResponseNumbers = {
  success: boolean,
  respCode: number,
  message: NumbersData[]
};


const reqOptions: RequestInit = {
  method: "get",
  redirect: "follow"
}

export const DatabaseAPI = {
  getSceneries: () => {
    return Sceneries;
  },
  getNumbers: async (): Promise<APIResponseNumbers> => {
    try {
      const res = await fetch("https://api.td2.info.pl:9640/?method=getTrainsOnline");
      return await (res.json() as Promise<APIResponseNumbers>);
    } catch (res_1) {
      console.error(res_1);
      return Promise.reject();
    }
  }
};