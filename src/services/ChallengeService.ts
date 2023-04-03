import Challenge from '../types/Challenge';

const url = 'http://localhost:3001/api/v1/';
// URL fetch for challenges : http://localhost:3000/api/v1/course/:course_id/challenges


const ChallengeService = {
  getChallenges: async (courseId: number): Promise<Challenge[]> => {
    const response = await fetch(url + 'courses/' + courseId + '/challenges');
    return response.json();
  },
  getChallenge: async (courseId: number, challengeId: number): Promise<Challenge> => {
    const response = await fetch(url + 'courses/' + courseId + '/challenges/' + challengeId);
    return response.json();
  }
};

export default ChallengeService;
