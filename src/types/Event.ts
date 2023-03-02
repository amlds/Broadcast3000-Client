export default interface event {
  id: number,
  name: string,
  start_time: string,
  end_time: string,
  description: string,
  event_type_id: number,
  school_id: number,
  image?: string,
}
