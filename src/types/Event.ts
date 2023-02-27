export default interface event {
  id: number,
  name: string,
  startEvent: string,
  endEvent: string,
  description: string,
  eventTypeId: number,
  schoolId: number,
  image?: string,
}
