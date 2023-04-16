import EventType from "./EventType";

export default interface event {
  id?: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  photo_url: string;
  event_type: EventType;
}
