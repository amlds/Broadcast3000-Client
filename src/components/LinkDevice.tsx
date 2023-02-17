import React from 'react';

import Copy from './svg/CopyIcones';

const LinkDevice: React.FC = () => {
  const linkRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const newValue = "broadcast3000.io/view/:idSession";
    linkRef.current && (linkRef.current.textContent = newValue);
  }, []);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const link = linkRef.current?.textContent;
    link && navigator.clipboard.writeText(link);
  };

  return (
    <div className='link__device'>
      <p>Here is your link to the viewer screen :</p>
      <div className='link__device-copy'>
        <p ref={linkRef}>broadcast3000.io/view/2987nd983p</p>
        <button className='button--primary' onClick={copyToClipboard}><Copy /></button>
      </div>
    </div>
  );
};

export default LinkDevice;
