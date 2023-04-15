import React from 'react';
import Cookies from 'js-cookie';

import Challenge from '../types/Challenge';
import school from '../types/School';
import Batch from '../types/Batch';
import BatchService from '../services/BatchService';

import Edit from './svg/Edit';
import ChallengeView from './ChallengesView';

interface Props {
  school: school[];
  batch: Batch[];
}

interface NewBatch {
  batch: {
    number: number;
    start_at: string;
    course_id: number;
  }
}

interface UpdateBatch {
  batch: {
    id: number;
    number: number;
    start_at: string;
    course_id: number;
  }
}

const BatchSettings: React.FC<Props> = (Props) => {
  const [token] = React.useState(Cookies.get('token'));
  const [state, setState] = React.useState(0);
  const [schoolId, setSchoolId] = React.useState<number>(Props.school[0].id);
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [batchToUpdate, setBatchToUpdate] = React.useState<Batch>();
  const [challenge, setChallenge] = React.useState<Challenge[]>([]);

  React.useEffect(() => {
    if (Props.school.length > 0) {
      setSchoolId(Props.school[0].id);
      setBatches(Props.batch);
      batches.map((batch) => {
        console.log(batch);
      });
    }
  }, [Props.batch, Props.school, batches]);

  React.useEffect(() => {
    const courseArray: Challenge[] = [];
    if (batches) {
      batches.forEach((batch) => {
        courseArray.push({
          id: batch.challenge.id,
          name: batch.challenge.name,
          programming_language: batch.challenge.programming_language,
        });
        console.log(batch.challenge);
      });
    }
    console.log(courseArray);
    setChallenge(courseArray);
  }, [batches]);

  const createBatch = async (schoolId: number, batch: NewBatch, token: any) => {
    const res = await BatchService.createBatch(schoolId, batch, token);
    return res;
  };

/*   const UpdateBatch = async (batch: NewBatch, token: any) => {
    const res = await BatchService.updateBatch(batch, token);
    return res;
  };

  const deleteBatch = async (batchId: number, token: any) => {
    const res = await BatchService.deleteBatch(batchId, token);
    return res;
  }; */

  const structureTime = (time: string) => {
    const date = new Date(time);
    return `${date.toLocaleDateString('fr-FR', {year:'numeric', month: 'long', day: 'numeric' })}`;
  };

  const goToUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const batchId = e.currentTarget.dataset.id;
    const goToUpdateBatch = batches.find((batch) => batch.id === Number(batchId));
    if (goToUpdateBatch) {
      setBatchToUpdate(goToUpdateBatch);
      setState(1);
    }
  };

  const viewBatch = (
    <div className='settings__batch'>
      <h3>Actual batches</h3>
      <ul>
        {batches.map((batch) => (
          <li key={batch.id}>
            <span className='md-text-1'>Batch #{batch.number} : </span>
            <span>start at - {batch.start_at}</span>
            <button className='button--edit--svg'
              data-id={batch.id}
              onClick={goToUpdate}>
                <Edit />
            </button>
          </li>
        ))}
      </ul>
      <button type="submit" className='button--primary' onClick={() => setState(1)}>Add a new batch</button>
    </div>
  )

  const editBatch = (
    <div className="edit-batch">
    </div>
  )

  const addBatch = (
    <div className="create-batch">
    </div>
  )

  return(
    <div className="batch-settings">
      {state === 0 && viewBatch}
      {state === 1 && editBatch}
      {state === 2 && addBatch}
    </div>
  )

}

export default BatchSettings;
