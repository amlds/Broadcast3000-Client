import React from 'react';

interface Props {
  image: string;
  key: number;
}

const CloudinaryImage: React.FC<Props> = ( Props ) => {
  const [image, setImage] = React.useState<string>('');

  React.useEffect(() => {
    setImage(Props.image);
  }, [Props.image]);

  return (
    <>
      <img src={image} key={Props.key} alt="Affiche de l'évenement affiché" />
    </>
  );
}

export default CloudinaryImage;
