import dashboardInfos from '../types/DashboardInfos';
import jwt_decode from 'jwt-decode';

const url = 'http://localhost:3001/api/schools/';

interface decodedToken {
  user_id: number;
  schools: [
    {
      id: number;
    }
  ]
  exp: number;
}


const dashboardService = {
  async getDashboardInfos(token: string): Promise<dashboardInfos> {
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    const schoolId = (decodedToken as decodedToken).schools[0].id;
    console.log(schoolId);
    console.log(token);
    console.log(`${url}/${schoolId}`);
    const response = await fetch(`${url}${schoolId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const dashboardInfos = await response.json();
    return dashboardInfos;
  }
};

export default dashboardService;
