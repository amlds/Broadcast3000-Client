export default interface Device {
  "id"?: number,
  "school": number,
  "events": {
    "id": number,
    "name": string,
    "description": string,
    "start_date": string,
    "end_date": string,
    "location": string,
    "event_type": {
      "id": number,
      "name": string,
      "description": string
    }
  }
}
