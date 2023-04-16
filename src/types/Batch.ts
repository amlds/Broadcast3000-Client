import Challenge from './Challenge';
import Course from './Course';

export default interface Batch {
  id: number;
  challenge: Challenge;
  course: Course;
  end_at: string;
  number: number;
  start_at: string;
}
