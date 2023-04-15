import React from 'react';
import Cookies from 'js-cookie';

import school from '../types/School';
import Batch from '../types/Batch';
import BatchService from '../services/BatchService';

import Edit from './svg/Edit';

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

const BatchConfig: React.FC<Props> = (Props) => {/*
  const [token] = React.useState(Cookies.get('token'));
  const [state, setState] = React.useState(0);
  const [schoolId, setSchoolId] = React.useState<number>(3);
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [batchToUpdate, setBatchToUpdate] = React.useState<UpdateBatch>();

  React.useEffect(() => {
    if (Props.school.length > 0) {
      setSchoolId(Props.school[0].id);
      setBatches(Props.batch);
    }
  }, [Props.batch, Props.school, batches]);

  const createBatch = async (schoolId: number, batch: NewBatch, token: any) => {
    const res = await BatchService.createBatch(schoolId, batch, token);
    return res;
  };

  const UpdateBatch = async (batch: NewBatch, token: any) => {
    const res = await BatchService.updateBatch(batch, token);
    return res;
  };

  const deleteBatch = async (batchId: number, token: any) => {
    const res = await BatchService.deleteBatch(batchId, token);
    return res;
  };

  const structureTime = (time: string) => {
    const date = new Date(time);
    return `${date.toLocaleDateString('fr-FR', {year:'numeric', month: 'long', day: 'numeric' })}`;
  };

  const goToUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const batchId = e.currentTarget.dataset.id;
    const goToUpdateBatch = batches.find((batch) => batch.batch.id === Number(batchId));
    if (goToUpdateBatch) {
      setBatchToUpdate(goToUpdateBatch);
      setState(2);
    }
  };

  const strucutureTimeForApi = (time: string) => {
    const date = new Date(time);
    const dateFormated = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}+02:00`;
    return dateFormated;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const batchNumber = Number(e.currentTarget.batchNumber.value);
    const startDate = strucutureTimeForApi(e.currentTarget.startDate.value);
    const courseId = Number(e.currentTarget.courseId.value);
    const batchToCreate = {
      batch: {
        number: batchNumber,
        start_at: startDate,
        course_id: courseId
      }
    };
    const res = await createBatch(schoolId, batchToCreate, token);
    if (res) {
      setBatches([...batches, res]);
      setState(0);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const batchId = e.currentTarget.dataset.id;
    const batchNumber = e.currentTarget.batchNumber.value;
    const startDate = e.currentTarget.startDate.value;
    const courseId = e.currentTarget.courseId.value;
    const batchGoToUpdate = {
      batch: {
        id: batchId,
        number: batchNumber,
        start_at: startDate,
        course_id: courseId
      }
    };
    const res = await UpdateBatch(batchGoToUpdate, token);
    if (res) {
      const newBatches = batches.map((batch) => {
        if (batch.batch.id === res.batch.id) {
          return res;
        }
        return batch;
      });
      setBatches(newBatches);
      setState(0);
    }
  };

  const viewBatch = (
    <div className='settings__batch'>
      <h3>Actual batches</h3>
      <ul>
        {batches.map((batch) => (
          <li key={batch.batch.id}>
            <span className='md-text-1'>Batch #{batch.batch.number} :</span>
            <CoursesView name={batch.batch.course.name} />
             - Started on {structureTime(batch.batch.start_at)}
            <button className='button--edit--svg'
              data-id={batch.batch.id}
              onClick={goToUpdate}>
                <Edit />
            </button>
          </li>
        ))}
      </ul>
      <button type="submit" className='button--primary' onClick={() => setState(1)}>Add a new batch</button>
    </div>
  );

  const addBatch = (
    <div className='settings__batch'>
      <h3>Add new batch</h3>
      <form className='batch__form' onSubmit={handleSubmit}>
        <label htmlFor="batchNumber">Batch number</label>
        <input className='input--txt' type="number" name="batchNumber" id="batchNumber" required />
        <label htmlFor="startDate">Start date</label>
        <input className='input--txt' type="date" name="startDate" id="startDate" required />
        <label htmlFor="courseId">Course</label>
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

  const updateBatch = (
    <div className='settings__batch'>
      <h3>Update batch #{batchToUpdate?.batch.number}</h3>
      <form className='batch__form' onSubmit={handleUpdate}>
        <label htmlFor="batchNumber">Batch number</label>
        <input className='input--txt' type="number" name="batchNumber" id="batchNumber" defaultValue={batchToUpdate?.batch.number} required />
        <label htmlFor="startDate">Start date</label>
        <input className='input--txt' type="date" name="startDate" id="startDate" defaultValue={batchToUpdate?.batch.start_at} required />
        <label htmlFor="courseId">Course</label>
        <div className="checkbox--batch">
          <input type="radio" id="webdev" name="courseId" value="1" className='textContaint'/>
          <label htmlFor="webdev">Web Development</label>
          <input type="radio" id="datascience" name="courseId" value="2" className='textContaint'/>
          <label htmlFor="datascience">Data Science</label>
          <input type="radio" id="dataanalyse" name="courseId" value="3" className='textContaint'/>
          <label htmlFor="dataanalyse">Data Analyse</label>
        </div>
        <div className="align-row">
          <button type="submit" className='button--primary'>Update</button>
          <button type="button" className="button--secondary--red" onClick={() => deleteBatch(batchToUpdate.batch.id, token)}>Delete Event</button>
          <button type="submit" className='button--secondary' onClick={() => setState(0)}>Back</button>
        </div>
      </form>
    </div>
  );

*/
  return (
    <div className='settings__batch'>
  {/*     {state === 0 && viewBatch}
      {state === 1 && addBatch}
     {state === 2 && updateBatch}
   */}  </div>
  );
 };

export default BatchConfig;
