import dashboardInfos from '../types/DashboardInfos';
import jwt_decode from 'jwt-decode';

const url = 'http://localhost:3000/api/schools/';

interface decodedToken {
  user_id: number;
  schools: {
    id: number;
    display_path: string;
    city_id: number;
    created_at: string;
    updated_at: string;
    message_display: string;
    nbr_carrousel: number;
  };
  exp: number;
}


const dashboardService = {
  async getDashboardInfos(token: string): Promise<dashboardInfos> {
    const decodedToken = jwt_decode(token);
    const schoolId = (decodedToken as decodedToken).schools.id;
    const response = await fetch(`${url}/${schoolId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dashboardInfos = await response.json();
    return dashboardInfos;
  }
};

export default dashboardService;
