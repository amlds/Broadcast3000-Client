import React from 'react';
import Cookies from 'js-cookie';

import school from '../types/School';
import Batch from '../types/Batch';
import BatchService from '../services/BatchService';

import CoursesView from './CoursesView';
import Edit from './svg/Edit';

interface Props {
  school: school[];
  batch: Batch[];
}

interface NewBatch {
  number: number;
  start_at: string;
  course_id: number;
}

interface BatchToUpdate {
  id: number;
  number: number;
  start_at: string;
  course_id: number;
}

const BatchConfig: React.FC<Props> = (Props) => {
  const [token] = React.useState(Cookies.get('token'));
  const [state, setState] = React.useState(0);
  const [schoolId, setSchoolId] = React.useState<number>(3);
  const [batches, setBatches] = React.useState<Batch[]>([]);
  const [batchToUpdate, setBatchToUpdate] = React.useState<Batch>();

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

  const UpdateBatch = async (batch: Batch, token: any) => {
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
    const goToUpdateBatch = batches.find((batch) => batch.id === Number(batchId));
    if (goToUpdateBatch) {
      setBatchToUpdate(goToUpdateBatch);
      setState(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const batchNumber = e.currentTarget.batchNumber.value;
    const startDate = e.currentTarget.startDate.value;
    const courseId = e.currentTarget.courseId.value;
    const batchToCreate = {
      number: batchNumber,
      start_at: startDate,
      course_id: courseId,
    };
    const res = await createBatch(schoolId, batchToCreate, token);
    if (res) {
      setBatches([...batches, res]);
      setState(0);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const batchNumber = e.currentTarget.batchNumber.value;
    const startDate = e.currentTarget.startDate.value;
    const courseId = e.currentTarget.courseId.value;
    const batchGoToUpdate = {
      id: batchToUpdate!.id,
      number: batchNumber,
      start_at: startDate,
      course: {
        id: courseId,
        name: batchToUpdate!.course.name
      }
    };
    const res = await UpdateBatch(batchGoToUpdate, token);
    if (res) {
      const newBatches = batches.map((batch) => {
        if (batch.id === res.id) {
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
          <li key={batch.id}>
            <span className='md-text-1'>Batch #{batch.number} :</span>
            <CoursesView name={batch.course.name} />
             - Started on {structureTime(batch.start_at)}
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
      <h3>Update batch #{batchToUpdate?.number}</h3>
      <form onSubmit={handleUpdate}>
        <label htmlFor="batchNumber">Batch number</label>
        <input type="number" name="batchNumber" id="batchNumber" defaultValue={batchToUpdate?.number} required />
        <label htmlFor="startDate">Start date</label>
        <input type="date" name="startDate" id="startDate" defaultValue={batchToUpdate?.start_at} required />
        <label htmlFor="courseId">Course</label>
        <select name="courseId" id="courseId" defaultValue={batchToUpdate?.course.id} required>
          <option value="1">Full Stack Web Development</option>
          <option value="2">Data Science</option>
          <option value="3">UX/UI Design</option>
        </select>
        <button type="submit" className='button--primary'>Update</button>
      </form>
      <button type="submit" className='button--primary' onClick={() => setState(0)}>Back</button>
    </div>
  );


  return (
    <div className='settings__batch'>
      {state === 0 && viewBatch}
      {state === 1 && addBatch}
     {state === 2 && updateBatch}
    </div>
  );
};

  /*
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
        <div className='threeButtonSet'>
          <div>
            <button className='button--secondary' onClick={() => setState(0)}>Cancel</button>
            <button type="submit" className='button--primary'>Confirm update</button>
          </div>
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
  ) */

export default BatchConfig;
