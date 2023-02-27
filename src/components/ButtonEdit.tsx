import React from 'react';
import { EventContext } from '../context/EventContext';

interface IButtonEditProps {
  id: number;
}

const ButtonEdit: React.FC<IButtonEditProps> = ({ id }) => {
  const { setId, toggleUpdate, isUpdate } = React.useContext(EventContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id;
    if (isUpdate) {
      setId(Number(id));
    } else {
      setId(Number(id));
      toggleUpdate();
    }
  };

  return (
    <>
      <button className='button--primay btnEdit' data-id={id} onClick={handleClick}>
        getId
      </button>
    </>
  );
};

export default ButtonEdit;
