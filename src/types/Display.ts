import Event from './Event';
import School from './School';

export default interface Display {
  error?: any;
  id: number;
  name: string;
  display_path: string;
  message_display: string;
  nbr_carrousel: number;
  events: Event[];
  school: School;
  city: {
    name: string;
  };
}
