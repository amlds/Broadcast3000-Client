export default interface Batch {
  id: number;
  course: {
    id: number;
    name: string;
  };
  end_at?: string;
  number: number;
  start_at: string;
}
