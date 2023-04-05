import React from 'react';
import Batch from '../types/Batch';

const ChallengeView: React.FC<Batch> = (Batch: Batch) => {
  return (
    <div className="align-row">
      <p>{Batch.number}</p>
      <p>{Batch.course.name}</p>
    </div>
  );
};

export default ChallengeView;
