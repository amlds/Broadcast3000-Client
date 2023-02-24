import React from 'react';

import Edit from './svg/Edit';

const Batch: React.FC = () => {
  const [state, setState] = React.useState(0);
  const viewBatch = (
    <div className='settings__batch'>
      <h3>Actual batches</h3>
      <ul>
        <li>Batch #1102 : Web development - Started on January 16 2023 <button className='button--edit--svg' onClick={() => setState(2)}><Edit /></button></li>
        <li>Batch #1104 : Data science - Started on January 16 2023 <button className='button--edit--svg' onClick={() => setState(2)}><Edit /></button></li>
      </ul>
      <button type="submit" className='button--primary' onClick={() => setState(1)}>Add a new batch</button>
    </div>
  );

  const createBatch = (
    <div className='settings__batch'>
      <h3>Add new batch</h3>
      <form className='batch__form'>
        <label>Batch name
          <input className='input--txt' type="text" name="batchName" placeholder='batch #932'/>
        </label>
        <label>Start date
          <input className='input--txt' type="date" name="startDate" />
        </label>
        <label>Type
          <div className='checkbox--batch'>
            <input type="radio" name='batchType' className="textContaint" id='typeDev'/>
            <label htmlFor='typeDev'>Web Development</label>
            <input type="radio" name='batchType' className="textContaint" id='typeScience'/>
            <label htmlFor='typeScience'>Data Science</label>
            <input type="radio" name='batchType' className="textContaint" id='typeAnalyse'/>
            <label htmlFor='typeAnalyse'>Data Analyse</label>
          </div>
        </label>
        <div className='align-row'>
          <button className='button--secondary' onClick={() => setState(0)}>Cancel</button>
          <button type="submit" className='button--primary'>Confirm create</button>
        </div>
      </form>
    </div>
  );

  const editBatch = (
    <div className='settings__batch'>
      <h3>Edit batch</h3>
      <form className='batch__form'>
        <label>Batch name
          <input className='input--txt' type="text" name="batchName" />
        </label>
        <label>Start date
          <input className='input--txt' type="date" name="startDate" />
        </label>
        <label>Type
          <div className='checkbox--batch'>
            <input type="radio" name='batchType' className="textContaint" id='typeDev'/>
            <label htmlFor='typeDev'>Web Development</label>
            <input type="radio" name='batchType' className="textContaint" id='typeScience'/>
            <label htmlFor='typeScience'>Data Science</label>
            <input type="radio" name='batchType' className="textContaint" id='typeAnalyse'/>
            <label htmlFor='typeAnalyse'>Data Analyse</label>
          </div>
        </label>
        <div className='align-row'>
          <button className='button--secondary' onClick={() => setState(0)}>Cancel</button>
          <button type="submit" className='button--primary'>Confirm update</button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      {state === 0 && viewBatch}
      {state === 1 && createBatch}
      {state === 2 && editBatch}
    </>
  )
};

export default Batch;
