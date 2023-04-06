import React from 'react';
import Batch from '../types/Batch';

interface Props {
  Batch: Batch;
}

const ChallengeView: React.FC<Props> = (Batch) => {
  return (
    <div className="align-row">
      <p>{Batch.Batch.course.name}</p>
    </div>
  );
};

export default ChallengeView;
