import React from 'react';

interface Props {
  image: string;
  key: number;
}

const CloudinaryImage: React.FC<Props> = ( Props ) => {
  return (
    <img src={Props.image} key={Props.key} alt="Affiche de l'évenement affiché" />
  );
}

export default CloudinaryImage;
