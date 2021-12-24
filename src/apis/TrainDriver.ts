export type TrainData = {
  trainNo: number,
  driverName?: string
}

type APIResponse = {
  success: boolean,
  respCode: number,
  message: TrainData[]
}

export let TrainDriverAPI = {
  getTrains: () => {
    return fetch("https://api.td2.info.pl:9640/?method=getTrainsOnline")
      .then(res => res.json() as Promise<APIResponse>)
  }
}