import React from 'react';

import Batch from '../types/Batch';
import BatchService from '../services/BatchService';

import CoursesView from './CoursesView';
import Edit from './svg/Edit';

const getBatchs = async () => {
  const batches = await BatchService.getBatchs(1);
  return batches;
};

const getBatch = async (id: number) => {
  const batch = await BatchService.getBatch(1, id);
  return batch;
};

const createBatch = async (batch: Batch) => {
  const res = await BatchService.createBatch(1, batch);
  return res;
};

const updateBatch = async (batch: Batch) => {
  const res = await BatchService.updateBatch(1, batch);
  return res;
};

const deleteBatch = async (id: number) => {
  const res = await BatchService.deleteBatch(1, id);
  return res;
};


const BatchConfig: React.FC = () => {
  const [state, setState] = React.useState(0);
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [batchToUpdate, setBatchToUpdate] = React.useState<Batch>({
    id: 0,
    number: 0,
    start_at: '',
    end_at: '',
    course_id: 0,
  } as Batch);

  React.useEffect(() => {
    if (state === 0) {
      getBatchs().then((batchs) => {
        setBatches(batchs);
      });
    }
  }, [state]);

  const endDate = (start: string) => {
    const timestamp = Date.parse(start);
    const newTimestamp = timestamp + 9 * 7 * 24 * 60 * 60 * 1000;
    const newDate = new Date(newTimestamp);
    const newDateString = newDate.toISOString().split('T')[0];
    return newDateString;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const batchNumber = (e.currentTarget as HTMLFormElement).batchNumber.value;
    const startDate = (e.currentTarget as HTMLFormElement).startDate.value;
    const courseId = (e.currentTarget as HTMLFormElement).courseId.value;
    const batchToCreate = {
      number: parseInt(batchNumber),
      start_at: startDate,
      end_at: endDate(startDate),
      course_id: parseInt(courseId),
    };
    createBatch(batchToCreate).then((res) => {
      setState(0);
    });
  };

  const goToUpdate = (e: React.MouseEvent) => {
    const id = (e.currentTarget as HTMLButtonElement).dataset.id;
    if (id === undefined) {
      return;
    } else {
      setState(2);
      getBatch(parseInt(id)).then((batch) => {
        setBatchToUpdate(batch);
      });
    }
  };

  const updateBatchElement = (e: React.FormEvent) => {
    e.preventDefault();
    const batchNumber = (e.currentTarget as HTMLFormElement).batchNumber.value;
    const startDate = (e.currentTarget as HTMLFormElement).startDate.value;
    const courseId = (e.currentTarget as HTMLFormElement).courseId.value;
    updateBatch({
      id: batchToUpdate.id,
      number: parseInt(batchNumber),
      start_at: startDate,
      end_at: endDate(startDate),
      course_id: parseInt(courseId),
    }).then((res) => {
      setState(0);
    });
  };

  const deleteBatchElement = (e: React.MouseEvent) => {
    const id = (e.currentTarget as HTMLButtonElement).dataset.id;
    if (id === undefined) {
      return;
    } else {
      deleteBatch(parseInt(id)).then((res) => {
        setState(0);
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (batchToUpdate === undefined) {
      return;
    }
    if (e.target.name === 'batchNumber') {
      setBatchToUpdate({ ...batchToUpdate, number: parseInt(e.target.value) });
    } else if (e.target.name === 'startDate') {
      setBatchToUpdate({ ...batchToUpdate, start_at: e.target.value });
    } else if (e.target.name === 'courseId') {
      console.log(e.target.value);
      setBatchToUpdate({ ...batchToUpdate, course_id: parseInt(e.target.value) });
    }
  };

  const viewBatch = (
    <div className='settings__batch'>
      <h3>Actual batches</h3>
      <ul>
        {batches.map((batch) => (
          <li key={batch.id}>
            <span className='md-text-1'>Batch #{batch.number} :</span> <CoursesView id={batch.course_id} /> - Started on {batch.start_at}
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
        <div className="checkbox--batch">
          <input type="radio" id="webdev" name="courseId" value="1" className='textContaint'/>
          <label htmlFor="webdev">Web Development</label>

          <input type="radio" id="datascience" name="courseId" value="2" className='textContaint'/>
          <label htmlFor="datascience">Data Science</label>

          <input type="radio" id="dataanalyse" name="courseId" value="3" className='textContaint'/>
          <label htmlFor="dataanalyse">Data Analyse</label>
        </div>
        <div className='align-row'>
          <button className='button--secondary' onClick={() => setState(0)}>Cancel</button>
          <button type="submit" className='button--primary'>Confirm create</button>
        </div>
      </form>
    </div>
  );

  const formUpdateBatch = (
    <div className='settings__batch'>
      <h3>Update batch</h3>
      <form className='batch__form' onSubmit={updateBatchElement}>
        <label>Batch number
          <input className='input--txt' type="number" name="batchNumber" placeholder='932' value={batchToUpdate.number} onChange={onChange}/>
        </label>
        <label>Start date
          <input className='input--txt' type="date" name="startDate" value={batchToUpdate.start_at} onChange={onChange}/>
        </label>
        <div className="checkbox--batch">
          <input type="radio" name="courseId" className='textContaint'
                  value="1" checked={batchToUpdate.course_id === 1}
                  onChange={onChange}/>
          <label htmlFor="webdev">Web Development</label>


          <input  type="radio" name="courseId" className='textContaint'
                  value="2" checked={batchToUpdate.course_id === 2}
                  onChange={onChange}/>
          <label htmlFor="datascience">Data Science</label>

          <input  type="radio" name="courseId" className='textContaint'
                  value="3" checked={batchToUpdate.course_id === 3}
                  onChange={onChange}/>
          <label htmlFor="dataanalyse">Data Analyse</label>
        </div>
        <div className='align-row'>
          <button className='button--secondary' onClick={() => setState(0)}>Cancel</button>
          <button type="submit" className='button--primary'>Confirm update</button>
          <button className='button--secondary button--secondary--red' data-id={batchToUpdate.id} onClick={deleteBatchElement}>Delete</button>
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
