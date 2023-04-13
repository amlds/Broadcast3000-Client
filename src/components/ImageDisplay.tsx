import React from 'react';

import ImageCloudinary from './ImageCloudinary';

interface Props {
  carrousel: number;
  event_images: string[];
}

const ImageDisplay: React.FC<Props> = (Props) => {
  const [image, setImage] = React.useState<string[]>([]);
  const [carrousel, setCarrousel] = React.useState<number>(0);

  React.useEffect(() => {
    setImage(Props.event_images);
    setCarrousel(Props.carrousel);
  }, [Props.event_images, Props.carrousel]);

  return (
    <>
      {
        image.forEach((img, index) => {
          if (index === carrousel) {
            return (
              <ImageCloudinary key={index} image={img} />
            )
          }
      })}
    </>
  );
};

export default ImageDisplay;
