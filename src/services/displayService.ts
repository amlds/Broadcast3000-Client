import Display from '../types/Display';

const url = 'http://localhost:3001/api/v1';

const displayService = {
  async getDisplayInfos(display_path: string): Promise<Display> {
    const response = await fetch(`${url}${display_path}`);
    const displayInfos = await response.json();
    return displayInfos;
  },
};

export default displayService;
