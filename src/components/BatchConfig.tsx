import React from 'react';

import Batch from '../types/Batch';
import BatchService from '../services/BatchService';

import Edit from './svg/Edit';

const getBatchs = async () => {
  const batches = await BatchService.getBatchs(1);
  return batches;
};

const createBatch = async (batch: Batch) => {
  const res = await BatchService.createBatch(1, batch);
  return res;
};

const updateBatch = async (batch: Batch) => {
  const res = await BatchService.updateBatch(1, batch);
  return res;
};

const BatchConfig: React.FC = () => {
  const [state, setState] = React.useState(0);
  const [batches, setBatches] = React.useState<Batch[]>([]);

  React.useEffect(() => {
    getBatchs().then((batchs) => {
      console.log(batchs);
      setBatches(batchs);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const batchNumber = (e.currentTarget as HTMLFormElement).batchNumber.value;
    const startDate = (e.currentTarget as HTMLFormElement).startDate.value;
    const courseId = (e.currentTarget as HTMLFormElement).courseId.value;
    console.log(batchNumber, startDate, courseId);
    const end = new Date(startDate);
    end.setDate(end.getDate() + 63);
    const batchToCreate = {
      number: parseInt(batchNumber),
      start_at: startDate,
      end_at: startDate,
      course_id: parseInt(courseId),
    };

    createBatch(batchToCreate).then((res) => {
      console.log(res);
      setState(0);
    });
  };

  const updateBatch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const viewBatch = (
    <div className='settings__batch'>
      <h3>Actual batches</h3>
      <ul>
        {batches.map((batch) => (
          <li key={batch.id}>
            Batch #{batch.number} : {batch.course_id} - Started on {batch.start_at}
            <button className='button--edit--svg' onClick={() => setState(2)}><Edit /></button>
          </li>
        ))}
      </ul>
      <button type="submit" className='button--primary' onClick={() => setState(1)}>Add a new batch</button>
    </div>
  );

  const formCreateBatch = (
    <div className='settings__batch'>
      <h3>Add new batch</h3>
      <form className='batch__form' onSubmit={handleSubmit}>
        <label>Batch number
          <input className='input--txt' type="number" name="batchNumber" placeholder='932'/>
        </label>
        <label>Start date
          <input className='input--txt' type="date" name="startDate" />
        </label>
        <label htmlFor='courseId'>Type
          <select className='input--txt' name="courseId" id="courseId">
            <option value="1">Web Development</option>
            <option value="2">Data Science</option>
            <option value="3">Data Analyse</option>
          </select>
        </label>
        {/* <label>Type
          <div className='checkbox--batch'>
            <input type="radio" name='coursesId' className="textContaint" />
            <label htmlFor='typeDev'>Web Development</label>
            <input type="radio" name='coursesId' className="textContaint" />
            <label htmlFor='typeScience'>Data Science</label>
            <input type="radio" name='coursesId' className="textContaint" />
            <label htmlFor='typeAnalyse'>Data Analyse</label>
          </div>
        </label> */}
        <div className='align-row'>
          <button className='button--secondary' onClick={() => setState(0)}>Cancel</button>
          <button type="submit" className='button--primary'>Confirm create</button>
        </div>
      </form>
    </div>
  );

  const formUpdateBatch = (
    <div className='settings__batch'>
      <h3>Edit batch</h3>
      <form className='batch__form' onSubmit={updateBatch}>
        <label>Batch name
          <input className='input--txt' type="text" name="batchName" />
        </label>
        <label>Start date
          <input className='input--txt' type="date" name="startDate" />
        </label>
        <label>Type
          <div className='checkbox--batch'>
            <input type="radio" name='coursesId' className="textContaint" value={1}/>
            <label htmlFor='typeDev'>Web Development</label>
            <input type="radio" name='coursesId' className="textContaint" value={2}/>
            <label htmlFor='typeScience'>Data Science</label>
            <input type="radio" name='coursesId' className="textContaint" value={3}/>
            <label htmlFor='typeAnalyse'>Data Analyse</label>
          </div>
        </label>
        <div className='align-row align-row--spaces'>
          <div className='align-row'>
            <button className='button--secondary' onClick={() => setState(0)}>Cancel</button>
            <button type="submit" className='button--primary'>Confirm update</button>
          </div>
          <button className='button--secondary button--secondary--red'>Delete this batch</button>
        </div>
      </form>
    </div>
  );
  return (
    <>
      {state === 0 && viewBatch}
      {state === 1 && formCreateBatch}
      {state === 2 && formUpdateBatch}
    </>
  )
};

export default BatchConfig;
