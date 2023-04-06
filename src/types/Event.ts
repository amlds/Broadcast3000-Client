export default interface event {
  id?: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  event_type: {
    name: string;
    color: string;
  };
}
