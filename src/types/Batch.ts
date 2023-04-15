import Challenge from './Challenge';

export default interface Batch {
  id: number;
  challenge: Challenge;
  end_at: string;
  number: number;
  start_at: string;
}
