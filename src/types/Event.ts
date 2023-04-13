import EventType from "./EventType";

export default interface event {
  id?: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  photo: File;
  event_type: EventType;
}
