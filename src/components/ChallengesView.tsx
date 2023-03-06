import React from 'react';

import ChallengeService from '../services/ChallengeService';
import Challenge from '../types/Challenge';
import CourseService from '../services/CourseService';

interface Props {
  CourseId: number;
}

const getChallenge = async (CourseId: number, ChallengeId: number) => {
  const challenge = await ChallengeService.getChallenge(CourseId, ChallengeId);
  return challenge;
}

const ChallengeView: React.FC<Props> = (Props) => {
  const [challenge, setChallenge] = React.useState<Challenge>(
    {
      id: 0,
      name: '',
      course_id: 0,
    } as Challenge
  );

  React.useEffect(() => {
    getChallenge(Props.CourseId, 1).then((challenge) => {
      setChallenge(challenge);
    })
  }, []);

  return (
    <p className='md-text-1'>{challenge.name}</p>
  );
};

export default ChallengeView;
