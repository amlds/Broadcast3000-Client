import dashboardInfos from '../types/DashboardInfos';
import school from '../types/School';

const url = 'http://localhost:3001/api/v1/schools/';

const dashboardService = {
  async getDashInfos(schoolInfos: school, token: string): Promise<dashboardInfos> {
    const response = await fetch(`${url}${schoolInfos.city_id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    const dashboardInfos = await response.json();
    return dashboardInfos;
  }
};

export default dashboardService;
