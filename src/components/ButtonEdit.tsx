import React from 'react';
import { EventContext } from '../context/EventContext';

import Edit from "./svg/Edit";

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
      <button className="button--edit cardEvent__content__buttonEdit" data-id={id} onClick={handleClick}>
      <Edit />Edit
      </button>
    </>
  );
};

export default ButtonEdit;
