import React from 'react';

import Challenge from '../types/Challenge';

interface Props {
  challenge: Challenge;
}

const ChallengeView: React.FC<Props> = (challenge) => {
  return (
    <div className="align-row">
      <p>{challenge.challenge.name}</p>
      <span> - </span>
      <p>{challenge.challenge.programming_language}</p>
    </div>
  );
};

export default ChallengeView;
