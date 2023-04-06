import React from 'react';

import Copy from './svg/CopyIcones';

const LinkDevice: React.FC<any> = (displayPath: any) => {
  const linkRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    console.log(displayPath);
    const newValue = `${window.location.origin}/display/${displayPath.displayPath}`;
    linkRef.current && (linkRef.current.textContent = newValue);
  }, [displayPath]);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const link = linkRef.current?.textContent;
    link && navigator.clipboard.writeText(link);
  };

  return (
    <div className='link__device'>
      <p>Here is your link to the viewer screen :</p>
      <div className='link__device-copy'>
        <p ref={linkRef}>broadcast3000.io/display/jenesaispasencore</p>
        <button className='button--primary' onClick={copyToClipboard}><Copy /></button>
      </div>
    </div>
  );
};

export default LinkDevice;
